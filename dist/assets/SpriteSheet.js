"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var gfx = require("../gfx/gfx");

var SpriteSheet =
/*#__PURE__*/
function () {
  function SpriteSheet(path, width, height) {
    var _this = this;

    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, SpriteSheet);

    var defaults = {
      flipFlags: null,
      margin: [0, 0],
      padding: [0, 0]
    };
    this.w = width;
    this.h = height || width;
    this.cellW = 0;
    this.cellH = 0; // Can pass flipFlags directly: TODO - figure out Options API

    if (!isNaN(opts)) {
      opts = {
        flipFlags: opts
      };
    }

    opts = _objectSpread({}, defaults, {}, opts);
    this.flipFlags = opts.flipFlags;
    this.margin = opts.margin;
    this.padding = opts.padding;

    if (typeof path !== "string") {
      // Direct init from image
      this.populate(path, this.flipFlags);
    } else {
      gfx.loadImage(path, function (img) {
        _this.populate(img, self.flipFlags);
      });
    }
  }

  _createClass(SpriteSheet, [{
    key: "populate",
    value: function populate(img, flipFlags) {
      this.sheet = img;

      if (flipFlags >= 0) {
        this.sheet = this.flipImage(img.canvas || img, flipFlags);
      }

      this.cellW = Math.ceil((img.width - this.margin[0]) / (this.w + this.padding[0]));
      this.cellH = Math.ceil((img.height - this.margin[1]) / (this.h + this.padding[1]));
    }
  }, {
    key: "flipImage",
    value: function flipImage(img, flags) {
      // flip: x = 1, y = 2, both = 3, none = 0
      var ctx = Ω.gfx.createCanvas(img.width * (flags & 1 ? 2 : 1), img.height * (flags & 2 ? 2 : 1));
      var cellW = img.width / this.w | 0;
      var cellH = img.height / this.h | 0;
      var i, j; // Draw the original

      ctx.drawImage(img, 0, 0);

      if (flags & 1) {
        // Flipped X
        for (j = 0; j < cellH; j++) {
          for (i = 0; i < cellW; i++) {
            ctx.save();
            ctx.translate(i * this.w * 0.5, j * this.h);
            ctx.scale(-1, 1);
            this.render({
              ctx: ctx
            }, i, j, -(i * this.w * 0.5) - img.width - this.w, 0);
            ctx.restore();
          }
        }
      }

      if (flags & 2) {
        // Flipped Y
        for (j = 0; j < cellH; j++) {
          for (i = 0; i < cellW; i++) {
            ctx.save();
            ctx.translate(i * this.w, j * this.h * 0.5);
            ctx.scale(1, -1);
            this.render({
              ctx: ctx
            }, i, j, 0, -(j * this.h * 0.5) - img.height - this.h);
            ctx.restore();
          }
        }
      }

      if (flags & 3) {
        // Flipped both
        for (j = 0; j < cellH; j++) {
          for (i = 0; i < cellW; i++) {
            ctx.save();
            ctx.translate(i * this.w * 0.5, j * this.h * 0.5);
            ctx.scale(-1, -1);
            this.render({
              ctx: ctx
            }, i, j, -(i * this.w * 0.5) - img.width - this.w, -(j * this.h * 0.5) - img.height - this.h);
            ctx.restore();
          }
        }
      }

      return ctx.canvas;
    }
  }, {
    key: "render",
    value: function render(gfx, col, row, x, y) {
      var w = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
      var h = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 1;
      var scale = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;

      if (col === -1) {
        return;
      }

      gfx.ctx.drawImage(this.sheet, col * (this.w + this.padding[0]) + this.margin[0], row * (this.h + this.padding[1]) + this.margin[1], w * this.w, h * this.h, x, y, w * this.w * scale, h * this.h * scale);
    }
  }]);

  return SpriteSheet;
}();

module.exports = SpriteSheet;