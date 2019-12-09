"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Screen = require("./screens/Screen");

var gfx = require("./gfx/gfx");

var input = require("./input/input");

var Stats = require("./utils/Stats");

var timer = require("./utils/Timer");

var utils = require("./utils/utils");

var Game =
/*#__PURE__*/
function () {
  function Game(w, h) {
    var _this = this;

    _classCallCheck(this, Game);

    this.canvas = "body";
    this.running = false;
    this.time = 0;
    this.preset_dt = 1 / 60;
    this.currentTime = Date.now();
    this.accumulator = 0;
    this.screen = new Screen();
    this._screenPrev = null;

    this._fade = function () {
      return {
        ratio: 0
      }();
    };

    this.dialog = null;
    this.fps = true;
    var ctx = initCanvas(this.canvas, w, h);
    global.Ω.env.w = ctx.canvas.width;
    global.Ω.env.h = ctx.canvas.height;
    gfx.init(ctx);
    input.init(ctx.canvas);
    global.Ω.evt.onload(function () {
      _this.load();

      _this.run(Date.now());
    });
    window.addEventListener("load", function () {
      global.Ω.pageLoad();
    }, false);
    this.running = true; // Use the game time, rather than Date.now()

    utils.now = function () {
      return _this.now();
    };

    this.stats = Stats();
  }

  _createClass(Game, [{
    key: "reset",
    value: function reset() {
      this.time = 0;
    }
  }, {
    key: "now",
    value: function now() {
      return this.time * 1000;
    }
  }, {
    key: "load",
    value: function load() {}
  }, {
    key: "run",
    value: function run() {
      var _this2 = this;

      var now = Date.now();
      var frameTime = Math.min((now - this.currentTime) / 1000, this.preset_dt);
      var c;
      this.currentTime = now;
      this.accumulator += frameTime;

      if (this.running) {
        c = 0;

        while (this.accumulator >= this.preset_dt) {
          c++;
          this.tick(this.preset_dt);
          this.accumulator -= this.preset_dt;
        }

        if (c > 1) {
          console.log("ran " + c + " ticks");
        }

        this.render(gfx);
      }

      window.requestAnimationFrame(function () {
        _this2.run(Date.now());
      });
    }
  }, {
    key: "stop",
    value: function stop() {}
  }, {
    key: "tick",
    value: function tick(delta) {
      this.stats.start();

      if (this.dialog) {
        this.dialog.tick(delta);
      } else {
        this.time += delta;

        if (this.screen.loaded) {
          this.screen._tick();
        }

        global.Ω.timers.tick();
      }

      input.tick();
      this.stats.stop();
    }
  }, {
    key: "render",
    value: function render(gfx) {
      var c = gfx.ctx;

      if (!this.screen.loaded) {
        return;
      }

      if (this._fade.ratio <= 0) {
        this.screen._render(gfx);
      } else {
        switch (this._fade.type) {
          case "inout":
            // Fade in/out to a colour
            if (this._fade.ratio > 0.5) {
              this.screenPrev._render(gfx);

              gfx.clear(this._fade.color, 1 - (this._fade.ratio - 0.5) * 2);
            } else {
              this.screen._render(gfx);

              gfx.clear(this._fade.color, this._fade.ratio * 2);
            }

            break;

          case "out":
            // Fade out to a colour
            this.screenPrev._render(gfx);

            gfx.clear(this._fade.color, 1 - this._fade.ratio);
            break;

          default:
            // Crossfade
            this.screen._render(gfx);

            c.globalAlpha = this._fade.ratio;

            this.screenPrev._render(gfx);

            c.globalAlpha = 1;
            break;
        }
      }

      this.dialog && this.dialog.render(gfx);

      if (this.fps) {
        var fps = this.stats.fps();
        gfx.ctx.fillStyle = "rgba(0,0,0,0.3)";
        gfx.ctx.fillRect(this.stats.pos[0], this.stats.pos[1], 50, 20);
        gfx.ctx.fillStyle = "#fff";
        gfx.ctx.font = "6pt monospace";
        gfx.ctx.fillText(fps[0] + " " + fps[1] + "/" + fps[2], this.stats.pos[0] + 5, this.stats.pos[1] + 13);
      }
    }
  }, {
    key: "setScreen",
    value: function setScreen(screen, opts) {
      var _this3 = this;

      opts = opts || {};
      this.screenPrev = this.screen;
      this.screen = screen;

      if (this.screenPrev) {
        this._fade = {
          ratio: 1,
          type: opts.type || "inout",
          color: opts.color || "#000"
        };
        timer(opts.time || 20, function (ratio) {
          _this3._fade.ratio = 1 - ratio;
        }, function () {
          _this3._fade.ratio = 0;
          _this3.screenPref = null;
        });
      }
    }
  }, {
    key: "setDialog",
    value: function setDialog(dialog) {
      this.dialog = dialog;
    }
  }, {
    key: "clearDialog",
    value: function clearDialog() {
      this.setDialog(null);
    }
  }]);

  return Game;
}();

;
/*
  Create or assign the canvas element
*/

function initCanvas(canvasSelector) {
  var w = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
  var h = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 225;
  var selCanvas = document.querySelector(canvasSelector);
  var newCanvas;
  var ctx;

  if (selCanvas === null) {
    console.error("Canvas DOM container not found:", canvasSelector);
    selCanvas = (_readOnlyError("selCanvas"), document.querySelector("body"));
  }

  if (selCanvas.nodeName.toUpperCase() === "CANVAS") {
    var explicitWidth = selCanvas.getAttribute("width");
    var explicitHeight = selCanvas.getAttribute("height");

    if (explicitWidth === null) {
      selCanvas.setAttribute("width", w);
    }

    if (explicitHeight === null) {
      selCanvas.setAttribute("height", h);
    }

    ctx = selCanvas.getContext("2d");
  } else {
    newCanvas = document.createElement("canvas");
    newCanvas.setAttribute("width", w);
    newCanvas.setAttribute("height", h);
    selCanvas.appendChild(newCanvas);
    ctx = newCanvas.getContext("2d");
  }

  ctx.imageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;

  if (!ctx) {
    console.error("Could not get 2D context.");
  }

  return ctx;
}

module.exports = Game;