"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SpriteSheet = require("../assets/SpriteSheet");

var Font =
/*#__PURE__*/
function () {
  function Font(path, w, h) {
    var map = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : " !\"#$%&'()*+,-./0123456789:;<=>?@abcdefghijklmnopqrstuvwxyz[/]^_`abcdefghijklmnopqrstuvwxyz{|}~";

    _classCallCheck(this, Font);

    this.sheet = new SpriteSheet(path, w, h);
    this.map = map.split("").map(function (c) {
      return c.charCodeAt(0);
    });
    this.w = w;
    this.h = h;
  }

  _createClass(Font, [{
    key: "render",
    value: function render(gfx, msg, x, y) {
      if (!msg) {
        return;
      }

      msg = msg.toString();
      var cellW = this.sheet.cellW;

      for (var i = 0; i < msg.length; i++) {
        var ch = msg.charCodeAt(i);
        var index = this.map.indexOf(ch);

        if (ch === 32 || index === -1) {
          continue;
        }

        this.sheet.render(gfx, index % cellW | 0, index / cellW | 0, x + i * this.w, y);
      }
    }
  }]);

  return Font;
}();

module.exports = Font;