const SpriteSheet = require("../assets/SpriteSheet");
class BitmapFont {

  constructor(path, w, h, map = " !\"#$%&'()*+,-./0123456789:;<=>?@abcdefghijklmnopqrstuvwxyz[/]^_`abcdefghijklmnopqrstuvwxyz{|}~") {

    this.sheet = new SpriteSheet(path, w, h);

    this.map = map.split("").map((c) => c.charCodeAt(0));

    this.w = w;
    this.h = h;

  }

  render(gfx, msg, x, y) {

    if (!msg) {
      return;
    }

    msg = msg.toString();

    const cellW = this.sheet.cellW;

    for (let i = 0; i < msg.length; i++) {

      const ch = msg.charCodeAt(i);
      const index = this.map.indexOf(ch);

      if (ch === 32 || index === -1) {
        continue;
      }

      this.sheet.render(
        gfx,
        (index % cellW) | 0,
        (index / cellW) | 0,
        x + (i * this.w),
        y);

    }
  }
}

module.exports = BitmapFont;

