"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var input = require("../input/input");

var Dialog =
/*#__PURE__*/
function () {
  function Dialog(key, cb) {
    _classCallCheck(this, Dialog);

    this.killKey = "escape";
    this.time = 0;

    if (typeof key === "function") {
      cb = key;
      key = null;
    }

    if (key) {
      this.killKey = key;
    }

    this.cb = cb;
  }

  _createClass(Dialog, [{
    key: "tick",
    value: function tick(delta) {
      this.time += delta;

      if (this.killKey && Ω.input.pressed(this.killKey)) {
        input.release(this.killKey);
        this.done();
      }
    }
  }, {
    key: "done",
    value: function done() {
      window.game.clearDialog();
      this.cb && this.cb();
    }
  }, {
    key: "render",
    value: function render(gfx) {
      var c = gfx.ctx;
      c.fillStyle = "rgba(0, 0, 0, 0.7)";
      c.fillRect(gfx.w * 0.15, gfx.h * 0.25, gfx.w * 0.7, gfx.h * 0.5);
    }
  }]);

  return Dialog;
}();

module.exports = Dialog;