const Camera = require("./Camera");
const math = require('../utils/math');

class TrackingCamera extends Camera {
  constructor(entity, w = 0, h = 0, bounds) {
    super(0, 0, w, h);

    this.xRange = 40;
    this.yRange = 30;

    this.bounds = bounds;

    this.track(entity);
  }

  track(entity) {

    this.entity = entity;
    this.x = entity.x - (this.w / this.zoom / 2) + (entity.w / this.zoom / 2);
    this.y = entity.y - (this.h / this.zoom / 2) + (entity.h / this.zoom / 2);

    this.constrainToBounds();

  }

  constrainToBounds() {

    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x > 0) {
      if (this.bounds && this.x + this.w / this.zoom > this.bounds[0]) {
        this.x = this.bounds[0] - this.w / this.zoom;
      }
    }
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.y > 0) {
      if (this.bounds && this.y + this.h / this.zoom > this.bounds[1]) {
        this.y = this.bounds[1] - this.h / this.zoom;
      }
    }

  }

  tick() {
    const center = math.center(this, this.zoom);
    const e = this.entity;
    const xr = this.xRange;
    const yr = this.yRange;

    if (e.x < center.x - xr) {
      this.x = e.x - (this.w / this.zoom / 2) + xr;
    }
    if (e.x + e.w > center.x + xr) {
      this.x = e.x + e.w - (this.w / this.zoom / 2) - xr;
    }
    if (e.y < center.y - yr) {
      this.y = e.y - (this.h / this.zoom / 2) + yr;
    }
    if (e.y + e.h > center.y + yr) {
      this.y = e.y + e.h - (this.h / this.zoom / 2) - yr;
    }

    this.constrainToBounds();

  }

  debugOutline() {
    return {
      render: function (gfx, cam) {
        const center = math.center(cam, cam.zoom);

        gfx.ctx.strokeStyle = "rgba(200, 255, 255, 1)";
        gfx.ctx.strokeRect(
          center.x - cam.xRange,
          center.y - cam.yRange,
          cam.xRange * 2,
          cam.yRange * 2);
      }
    }
  }
  
  render(gfx, renderables) {
    if (this.debug) renderables = renderables.concat([this.debugOutline()]);

    super.render(gfx,renderables);
  }
}

module.exports = TrackingCamera;

