class Text {
  constructor(font, text = "", x = 0, y = 0) {
    this.x = x;
    this.y = y;

    this.font = font;
    this.text = text;

    this.updateSize();
  }

  setText(text) {
    this.text = text;
    this.updateSize();
  }

  setFont(font) {
    this.font = font;
    this.updateSize();
  }

  updateSize() {
    this.w = this.font.w * this.text.length;
    this.h = this.font.h;
  }

  render(gfx) {
    this.font.render(gfx, this.text, this.x, this.y)
  }
}

module.exports = Text;