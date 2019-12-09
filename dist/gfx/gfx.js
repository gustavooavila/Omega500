"use strict";

var images = {};
var gfx = {
  init: function init(ctx) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.w = this.canvas.width;
    this.h = this.canvas.height;
  },
  loadImage: function loadImage(path, cb, flipFlags) {
    var _this = this;

    // TODO: don't need to reload if non-flipped image exists
    var cachedImage = images[path + (flipFlags ? ":" + flipFlags : "")];

    if (cachedImage) {
      if (!cachedImage._loaded) {
        cachedImage.addEventListener("load", function () {
          cb && cb(cachedImage);
        }, false);
        cachedImage.addEventListener("load", function () {
          cb && cb(cachedImage);
        }, false);
      } else {
        cb && cb(cachedImage);
      }

      return;
    }

    var resolve = global.Ω.preload(path);
    var image = new Image();

    var onload = function onload() {
      var procImage;

      if (flipFlags >= 0) {
        procImage = _this.flipImage(image, flipFlags);
      }

      _this._loaded = true;
      cb && cb(procImage || image);
      resolve();
    };

    image._loaded = false;
    image.src = path;
    image.addEventListener("load", onload, false);
    image.addEventListener("error", function () {
      console.error("Error loading image", path);
      onload.call(this);
    }, false);
    images[path + (flipFlags ? ":" + flipFlags : "")] = image;
  },
  drawImage: function drawImage(img, x, y, scaleX, scaleY) {
    this.ctx.drawImage(img, x, y, img.width * scaleX ? scaleX : 1, img.height * scaleY ? scaleY : 1);
  },
  flipImage: function flipImage(img, flags) {
    var ctx = this.createCanvas(img.width, img.height); // flip x = 1, y = 2, both = 3, none = 0

    ctx.save();
    ctx.translate(flags & 1 ? img.width : 0, flags & 2 ? img.height : 0);
    ctx.scale(flags & 1 ? -1 : 1, flags & 2 ? -1 : 1);
    ctx.drawImage(img, 0, 0);
    ctx.restore();
    return ctx.canvas;
  },
  clear: function clear(color, alpha) {
    var c = this.ctx;
    var oldAlpha;
    alpha = alpha === undefined ? 1 : alpha;

    if (alpha !== 1) {
      oldAlpha = c.globalAlpha;
      c.globalAlpha = alpha;
    }

    c.fillStyle = color;
    c.fillRect(0, 0, this.w, this.h);

    if (oldAlpha) {
      c.globalAlpha = oldAlpha;
    }
  },
  createCanvas: function createCanvas(w, h) {
    var cn = document.createElement("canvas");
    var ctx = cn.getContext("2d");
    cn.setAttribute("width", w);
    cn.setAttribute("height", h);
    ctx.imageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    return ctx;
  },
  text: {
    drawShadowed: function drawShadowed(msg, x, y, shadow, font) {
      var c = gfx.ctx;
      shadow = shadow || 2;

      if (font) {
        c.font = font;
      }

      c.fillStyle = "#000";
      c.fillText(msg, x + shadow, y + shadow);
      c.fillStyle = "#fff";
      c.fillText(msg, x, y);
    },
    getWidth: function getWidth(msg) {
      return gfx.ctx.measureText(msg).width;
    },
    getHalfWidth: function getHalfWidth(msg) {
      return this.getWidth(msg) / 2;
    },
    getHeight: function getHeight(msg) {
      return gfx.ctx.measureText(msg).height;
    },
    getHalfHeight: function getHalfHeight(msg) {
      return this.getHeight(msg) / 2;
    }
  }
};
module.exports = gfx;