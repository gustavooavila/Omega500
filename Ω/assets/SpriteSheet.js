const gfx = require("../gfx/gfx");

class SpriteSheet {

  constructor(path, width, height, opts = {}) {

    const defaults = {
      flipFlags: null,
      margin: [0, 0],
      padding: [0, 0]
    };


    this.w = width;
    this.h = height || width;
    this.cellW = 0;
    this.cellH = 0;

    // Can pass flipFlags directly: TODO - figure out Options API
    if (!isNaN(opts)) {
      opts = {
        flipFlags: opts
      };
    }
    opts = { ...defaults, ...opts };

    this.flipFlags = opts.flipFlags;
    this.margin = opts.margin;
    this.padding = opts.padding;

    if (typeof path !== "string") {
      // Direct init from image
      this.populate(path, this.flipFlags);
    } else {
      gfx.loadImage(path, (img) => {

        this.populate(img, self.flipFlags);

      });
    }

  }

  populate(img, flipFlags) {

    this.sheet = img;
    if (flipFlags >= 0) {
      this.sheet = this.flipImage(img.canvas || img, flipFlags);
    }

    this.cellW = Math.ceil((img.width - this.margin[0]) / (this.w + this.padding[0]));
    this.cellH = Math.ceil((img.height - this.margin[1]) / (this.h + this.padding[1]));

  }

  flipImage(img, flags) {

    // flip: x = 1, y = 2, both = 3, none = 0

    const ctx = Ω.gfx.createCanvas(
      img.width * (flags & 1 ? 2 : 1),
      img.height * (flags & 2 ? 2 : 1)
    );
    const cellW = img.width / this.w | 0;
    const cellH = img.height / this.h | 0;
    let i, j;

    // Draw the original
    ctx.drawImage(img, 0, 0);

    if (flags & 1) {
      // Flipped X
      for (j = 0; j < cellH; j++) {
        for (i = 0; i < cellW; i++) {
          ctx.save();
          ctx.translate(i * this.w * 0.5, j * this.h);
          ctx.scale(-1, 1);
          this.render({ ctx: ctx }, i, j, -(i * this.w * 0.5) - img.width - this.w, 0);
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
          this.render({ ctx: ctx }, i, j, 0, -(j * this.h * 0.5) - img.height - this.h);
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
          this.render(
            { ctx: ctx },
            i,
            j,
            -(i * this.w * 0.5) - img.width - this.w,
            -(j * this.h * 0.5) - img.height - this.h);
          ctx.restore();
        }
      }
    }

    return ctx.canvas;

  }

  render(gfx, col, row, x, y, w = 1, h = 1, scale = 1) {
    if (col === -1) {
      return;
    }

    gfx.ctx.drawImage(
      this.sheet,
      col * (this.w + this.padding[0]) + this.margin[0],
      row * (this.h + this.padding[1]) + this.margin[1],
      w * this.w,
      h * this.h,
      x,
      y,
      w * this.w * scale,
      h * this.h * scale);
  }

}

module.exports = SpriteSheet;
