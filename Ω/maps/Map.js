const math = require("../utils/math");
class Map {
  constructor(sheet, cells = [[]], walkable = 0) {
    this.x = 0; // Position required for camera rendering check
    this.y = 0;

    this.walkable = 0;

    this.repeat = false;
    this.parallax = 0;

    this.sheet = sheet;
    this.walkable = walkable;

    this.populate(cells);
  }

  tick() {
    return true;
  }

  populate(cells) {

    this.cells = cells;
    this.cellH = this.cells.length;
    this.cellW = this.cells[0].length;
    this.h = this.cellH * this.sheet.h;
    this.w = this.cellW * this.sheet.w;

  }

  render(gfx, camera) {

    if (!camera) {
      camera = {
        x: 0,
        y: 0,
        w: gfx.w,
        h: gfx.h,
        zoom: 1
      };
    }

    const tw = this.sheet.w;
    const th = this.sheet.h;
    const cellW = this.sheet.cellW;
    const cellH = this.sheet.cellH;
    const stx = (camera.x - (camera.x * this.parallax)) / tw | 0;
    const sty = (camera.y - (camera.y * this.parallax)) / th | 0;
    const endx = stx + (camera.w / camera.zoom / tw | 0) + 1;
    const endy = sty + (camera.h / camera.zoom / th | 0) + 1;

    let j;
    let i;
    let cell;

    if (this.parallax) {
      gfx.ctx.save();
      gfx.ctx.translate(camera.x * this.parallax | 0, camera.y * this.parallax | 0);
    }

    for (j = sty; j <= endy; j++) {
      if (j < 0 || !this.repeat && j > this.cellH - 1) {
        continue;
      }
      for (i = stx; i <= endx; i++) {
        if (i < 0 || !this.repeat && i > this.cellW - 1) {
          continue;
        }

        cell = this.cells[j % this.cellH][i % this.cellW];
        if (cell === 0) {
          continue;
        }
        this.sheet.render(
          gfx,
          (cell - 1) % cellW | 0,
          (cell - 1) / cellW | 0,
          i * tw,
          j * th);
      }
    }

    if (this.parallax) {
      gfx.ctx.restore();
    }

  }

  getBlockCell(block) {
    let row = block[1] / this.sheet.h | 0;
    let col = block[0] / this.sheet.w | 0;

    if (row < 0 || row > this.cellH - 1) {
      row = -1;
    }
    if (col < 0 || col > this.cellW - 1) {
      col = -1;
    }

    return [col, row];
  }

  getCellPixels(block) {
    const row = block[1] * this.sheet.h;
    const col = block[0] * this.sheet.w;

    return [col, row];
  }

  getBlock(block) {

    const row = block[1] / this.sheet.h | 0;
    const col = block[0] / this.sheet.w | 0;

    if (row < 0 || row > this.cellH - 1) {
      return;
    }

    return this.cells[row][col];

  }

  getBlocks(blocks) {
    return blocks.map(this.getBlock, this);
  }

  getBlockEdge(pos, vertical) {

    var snapTo = vertical ? this.sheet.h : this.sheet.w;

    return math.snap(pos, snapTo);
  }

  setBlock(pos, block) {

    var row = pos[1] / this.sheet.h | 0,
      col = pos[0] / this.sheet.w | 0;

    if (row < 0 || row > this.cellH - 1 || col < 0 || col > this.cellW - 1) {
      return;
    }

    this.cells[row][col] = block;

  }

  setBlockCell(pos, block) {

    var row = pos[1],
      col = pos[0];

    if (row < 0 || row > this.cellH - 1 || col < 0 || col > this.cellW - 1) {
      return;
    }

    this.cells[row][col] = block;

  }

}

module.exports = Map;

