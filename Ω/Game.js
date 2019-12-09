const Screen = require("./screens/Screen");
const gfx = require("./gfx/gfx");
const input = require("./input/input");
const Stats = require("./utils/Stats");
const timer = require("./utils/Timer");
const utils = require("./utils/utils");

class Game {

  constructor(w, h) {

    this.canvas = "body";

    this.running = false;
    this.time = 0;

    this.preset_dt = 1 / 60;
    this.currentTime = Date.now();
    this.accumulator = 0;

    this.screen = new Screen();
    this._screenPrev = null;
    this._fade = (() => ({ ratio: 0 })());
    this.dialog = null;

    this.fps = true;

    const ctx = initCanvas(this.canvas, w, h);

    global.Ω.env.w = ctx.canvas.width;
    global.Ω.env.h = ctx.canvas.height;

    gfx.init(ctx);
    input.init(ctx.canvas);

    global.Ω.evt.onload(() => {
      this.load();
      this.run(Date.now());
    });

    window.addEventListener("load", function () {
      global.Ω.pageLoad();
    }, false);

    this.running = true;

    // Use the game time, rather than Date.now()
    utils.now = () => this.now();

    this.stats = Stats();

  }

  reset() {

    this.time = 0;

  }

  now() {

    return this.time * 1000;

  }

  load() { }

  run() {


    const now = Date.now();
    const frameTime = Math.min((now - this.currentTime) / 1000, this.preset_dt);
    let c;

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

    window.requestAnimationFrame(() => {

      this.run(Date.now());

    });

  }

  stop() { }

  tick(delta) {

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

  render(gfx) {

    const c = gfx.ctx;

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
            gfx.clear(this._fade.color, 1 - ((this._fade.ratio - 0.5) * 2));
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

  setScreen(screen, opts) {

    opts = opts || {};

    this.screenPrev = this.screen;
    this.screen = screen;

    if (this.screenPrev) {
      this._fade = {
        ratio: 1,
        type: opts.type || "inout",
        color: opts.color || "#000"
      };
      timer(opts.time || 20, (ratio) => {

        this._fade.ratio = 1 - ratio;

      }, () => {

        this._fade.ratio = 0;
        this.screenPref = null;

      });
    }

  }

  setDialog(dialog) {

    this.dialog = dialog;

  }
  clearDialog() {

    this.setDialog(null);

  }
};

/*
  Create or assign the canvas element
*/
function initCanvas(canvasSelector, w = 400, h = 225) {

  const selCanvas = document.querySelector(canvasSelector);
  let newCanvas;
  let ctx;

  if (selCanvas === null) {
    console.error("Canvas DOM container not found:", canvasSelector);
    selCanvas = document.querySelector("body");
  }

  if (selCanvas.nodeName.toUpperCase() === "CANVAS") {
    const explicitWidth = selCanvas.getAttribute("width");
    const explicitHeight = selCanvas.getAttribute("height");

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
