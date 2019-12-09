const input = require("../input/input");

class Dialog  {

  constructor(key, cb) {

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

  tick(delta) {

    this.time += delta;

    if (this.killKey && Ω.input.pressed(this.killKey)) {
      input.release(this.killKey);
      this.done();
    }

  }

  done () {

    window.game.clearDialog();
    this.cb && this.cb();

  }

  render(gfx) {

    const c = gfx.ctx;

    c.fillStyle = "rgba(0, 0, 0, 0.7)";
    c.fillRect(gfx.w * 0.15, gfx.h * 0.25, gfx.w * 0.7, gfx.h * 0.5);

  }

}

module.exports = Dialog;
