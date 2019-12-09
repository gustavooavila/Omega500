"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Anims =
/*#__PURE__*/
function () {
  function Anims(anims) {
    _classCallCheck(this, Anims);

    this.current = null;
    this.all = null;

    if (anims.length) {
      this.all = anims;
      this.current = anims[0];
    }
  }

  _createClass(Anims, [{
    key: "tick",
    value: function tick() {
      this.current.tick();
    }
  }, {
    key: "add",
    value: function add(anim) {
      if (!this.all) {
        this.all = [];
        this.current = anim;
      }

      this.all.push(anim);
    }
  }, {
    key: "each",
    value: function each(func) {
      this.all.forEach(func);
    }
  }, {
    key: "get",
    value: function get() {
      return this.current.name;
    }
  }, {
    key: "set",
    value: function set(animName) {
      var anim = this.all.filter(function (anim) {
        return anim.name === animName;
      });

      if (anim.length) {
        this.current = anim[0];
        this.current.reset();
      }
    }
  }, {
    key: "setTo",
    value: function setTo(animName) {
      if (this.get() !== animName) {
        this.set(animName);
      }
    }
  }, {
    key: "changed",
    value: function changed() {
      return this.current.changed;
    }
  }, {
    key: "rewound",
    value: function rewound() {
      return this.current.rewound;
    }
  }, {
    key: "render",
    value: function render(gfx, x, y) {
      this.current.render(gfx, x, y);
    }
  }]);

  return Anims;
}();

module.exports = Anims;