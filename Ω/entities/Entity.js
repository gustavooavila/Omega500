
class Entity {
  constructor(x = 0, y = 0, w = 32, h = 32) {

    this.xo = 0;
    this.yo = 0;

    this.gravity = 0;
    this.falling = false;
    this.wasFalling = false;

    this.remove = false;

    this.traits = null;

    this.bodies = null; // bodies to be added by the screen

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    const t = this.traits || [];
    this.traits = [];
    this.mixin(t);

  }

  tick() {
    this.traits = this.traits.filter((t) => t.tick.call(this, t));
    return !(this.remove);
  }

  add(body, tag, zIndex) {
    if (!this.bodies) {
      this.bodies = [];
    }
    this.bodies.push([body, tag, zIndex]);
    return body;
  }

  mixin(traits) {

    traits.forEach(function (t) {

      if (t.trait) {
        const trait = new t.trait();
        trait.init_trait.apply(this, [trait].concat(trait.makeArgs(t)));
        this.traits.push(trait);
      }

    }, this);

  }

  hit(entity) { }

  hitBlocks(xBlocks, yBlocks) { }

  moveBy(xo, yo) {
    this.xo = xo;
    this.yo = yo;
  }

  /*
    x & y is the amount the entity WANTS to move,
    if there were no collision with the map.
  */
  move(x, y, map) {

    // Temp holder for movement
    let xo, yo;

    let xv, yv;

    let hitX = false;
    let hitY = false;

    let xBlocks;
    let yBlocks;

    // Apply simple gravity
    if (this.falling) {
      y += this.gravity;
    }
    xo = x;
    yo = y;

    xv = this.x + xo;
    yv = this.y + yo;

    // check blocks given vertical movement TL, BL, TR, BR
    yBlocks = map.getBlocks([
      [this.x, yv],
      [this.x, yv + (this.h - 1)],
      [this.x + (this.w - 1), yv],
      [this.x + (this.w - 1), yv + (this.h - 1)]
    ]);

    // if overlapping edges, move back a little
    if (y < 0 && (yBlocks[0] > map.walkable || yBlocks[2] > map.walkable)) {
      // Hmmm... why only this guy needs to be floored?
      yo = map.getBlockEdge((yv | 0) + map.sheet.h, "VERT") - this.y;
      hitY = true;
    }
    if (y > 0 && (yBlocks[1] > map.walkable || yBlocks[3] > map.walkable)) {
      yo = map.getBlockEdge(yv + this.h, "VERT") - this.y - this.h;
      hitY = true;
    }

    // Add the allowed Y movement
    this.y += yo;

    // Now check blocks given horizontal movement TL, BL, TR, BR
    xBlocks = map.getBlocks([
      [xv, this.y],
      [xv, this.y + (this.h - 1)],
      [xv + (this.w - 1), this.y],
      [xv + (this.w - 1), this.y + (this.h - 1)]
    ]);

    // if overlapping edges, move back a little
    if (x < 0 && (xBlocks[0] > map.walkable || xBlocks[1] > map.walkable)) {
      xo = map.getBlockEdge(xv + map.sheet.w) - this.x;
      hitX = true;
    }
    if (x > 0 && (xBlocks[2] > map.walkable || xBlocks[3] > map.walkable)) {
      xo = map.getBlockEdge(xv + this.w) - this.x - this.w;
      hitX = true;
    }

    if (hitX || hitY) {
      this.hitBlocks(hitX ? xBlocks : null, hitY ? yBlocks : null);
    }

    // Add the allowed X movement
    this.x += xo;

    // check if we're falling
    yBlocks = map.getBlocks([
      [this.x, this.y + this.h],
      [this.x + (this.w - 1), this.y + this.h]
    ]);

    this.wasFalling = this.falling;
    if (yBlocks[0] <= map.walkable && yBlocks[1] <= map.walkable) {
      this.falling = true;
    } else {
      this.falling = false;
    }

    // Reset offset amount
    this.xo = 0;
    this.yo = 0;

    return [xo, yo];
  }

  render(gfx) {

    const c = gfx.ctx;

    c.fillStyle = "#c00";
    c.fillRect(this.x, this.y, this.w, this.h);

  }

}

module.exports = Entity;
