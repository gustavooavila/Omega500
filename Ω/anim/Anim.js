const utils = require("../utils/utils");

class Anim {
  constructor(name, sheet, speed, frames, cb) {

    this.name = name;
    this.sheet = sheet;
    this.frames = frames;
    this.speed = speed;
    this.cb = cb;

    this.scale = 1;
    this.changed = false;
    this.rewound = false;

    this.reset();

  }

  tick() {

    const diff = utils.now() - this.frameTime;
    this.changed = false;
    this.rewound = false;

    if (diff > this.speed) {
      this.frameTime = utils.now() + (Math.min(this.speed, diff - this.speed));
      if (++this.curFrame > this.frames.length - 1) {
        this.curFrame = 0;
        this.rewound = true;
        this.cb && this.cb();
      };
      this.changed = true;
    }

  }

  reset() {
    this.curFrame = 0;
    this.frameTime = utils.now();
  }

  render(gfx, x, y) {

    this.sheet.render(
      gfx,
      this.frames[this.curFrame][0],
      this.frames[this.curFrame][1],
      x,
      y,
      1,
      1,
      this.scale);

  }

}

module.exports = Anim;
