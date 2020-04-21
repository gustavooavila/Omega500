
class Screen {

  constructor() {
    this.loaded = true; // Set to false if you want to do async stuff
    this.frame = 0;
  }

  tick() { }

  _tick() {
    this.frame++;
    this.tick();
  }

  clear(gfx, col = "hsl(195, 40%, 40%)") {
    gfx.clear(col);
  }

  render(gfx) {
    const c = gfx.ctx;

    c.fillStyle = "hsl(0, 0%, 0%)";
    c.fillRect(0, 0, gfx.w, gfx.h);
  }

  _render(gfx) {
    this.renderBG && this.renderBG(gfx);

    // Render over entire view port
    this.render(gfx);

    this.renderFG && this.renderFG(gfx);
  }

}

module.exports = Screen;

