"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var gfx = require("../gfx/gfx");

var Image =
/*#__PURE__*/
function () {
  function Image(path, flipFlags, scale) {
    _classCallCheck(this, Image);

    this.w = 0;
    this.h = 0;
    this.path = path;
    gfx.loadImage(path, function (img) {
      self.img = img;
      self.w = img.width * self.scale;
      self.h = img.height * self.scale;
    }, flipFlags);
    this.scale = scale || 1;
  }

  _createClass(Image, [{
    key: "render",
    value: function render(gfx, x, y) {
      gfx.ctx.drawImage(this.img, x, y, this.img.width * this.scale, this.img.height * this.scale);
    }
  }]);

  return Image;
}();

module.exports = Image;