  const gfx = require("../gfx/gfx");
  class Image {

		constructor (path, flipFlags, scale) {
      this.w= 0;
      this.h= 0;
			

			this.path = path;

			gfx.loadImage(path, function (img){

				self.img = img;
				self.w = img.width * self.scale;
				self.h = img.height * self.scale;

			}, flipFlags);

			this.scale = scale || 1;

		}

		render (gfx, x, y) {

			gfx.ctx.drawImage(
				this.img,
				x,
				y,
				this.img.width * this.scale,
				this.img.height * this.scale
			);

		}

	}

	module.exports = Image;