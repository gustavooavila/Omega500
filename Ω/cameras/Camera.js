class Camera {
  constructor(x = 0, y = 0, w = 0, h = 0) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.zoom = 1;
    this.debug = false;
  }

  tick() { }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }

  moveBy(x, y) {
    this.x += x;
    this.y += y;
  }

  renderPre(gfx) {
    const c = gfx.ctx;
    
    c.save();
    c.scale(this.zoom, this.zoom);
    c.translate(-(Math.round(this.x)), -(Math.round(this.y)));
  }

  renderPost(gfx) {
    const c = gfx.ctx;

    if (this.debug) {
      c.strokeStyle = "red";
      c.strokeRect(this.x, this.y, this.w / this.zoom, this.h / this.zoom);
    }

    c.restore();
  }

  render(gfx, renderables, noPrePost) {
    !noPrePost && this.renderPre(gfx);

    renderables
      // Flatten to an array
      .reduce((acc, e) => {
        if (Array.isArray(e)) {
          return acc.concat(e);
        }
        acc.push(e);
        return acc;
      }, [])
      // Remove out-of-view entities
      // TODO: maybe use quad tree for this?
      .filter((r) =>
        r.repeat || !(
          r.x + r.w < this.x ||
          r.y + r.h < this.y ||
          r.x > this.x + (this.w / this.zoom) ||
          r.y > this.y + (this.h / this.zoom))
      )
      // Draw 'em
      .forEach((r) => {
        r.render(gfx, this);
      });
    !noPrePost && this.renderPost(gfx);
  }

}

module.exports = Camera;
