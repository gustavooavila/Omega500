"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var utils = require("../utils/utils");

var Anim =
/*#__PURE__*/
function () {
  function Anim(name, sheet, speed, frames, cb) {
    _classCallCheck(this, Anim);

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

  _createClass(Anim, [{
    key: "tick",
    value: function tick() {
      var diff = utils.now() - this.frameTime;
      this.changed = false;
      this.rewound = false;

      if (diff > this.speed) {
        this.frameTime = utils.now() + Math.min(this.speed, diff - this.speed);

        if (++this.curFrame > this.frames.length - 1) {
          this.curFrame = 0;
          this.rewound = true;
          this.cb && this.cb();
        }

        ;
        this.changed = true;
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.curFrame = 0;
      this.frameTime = utils.now();
    }
  }, {
    key: "render",
    value: function render(gfx, x, y) {
      this.sheet.render(gfx, this.frames[this.curFrame][0], this.frames[this.curFrame][1], x, y, 1, 1, this.scale);
    }
  }]);

  return Anim;
}();

module.exports = Anim;