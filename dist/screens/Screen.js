"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Screen =
/*#__PURE__*/
function () {
  function Screen() {
    _classCallCheck(this, Screen);

    this.loaded = true; // Set to false if you want to do async stuff

    this.frame = 0;
  }

  _createClass(Screen, [{
    key: "tick",
    value: function tick() {}
  }, {
    key: "_tick",
    value: function _tick() {
      this.frame++;
      this.tick();
    }
  }, {
    key: "clear",
    value: function clear(gfx) {
      var col = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "hsl(195, 40%, 40%)";
      gfx.clear(col);
    }
  }, {
    key: "render",
    value: function render(gfx) {
      var c = gfx.ctx;
      c.fillStyle = "hsl(0, 0%, 0%)";
      c.fillRect(0, 0, gfx.w, gfx.h);
    }
  }, {
    key: "_render",
    value: function _render(gfx) {
      this.renderBG && this.renderBG(gfx); // Render over entire view port

      this.render(gfx);
      this.renderFG && this.renderFG(gfx);
    }
  }]);

  return Screen;
}();

module.exports = Screen;