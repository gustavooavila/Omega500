"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var math = require("../utils/math");

var Map =
/*#__PURE__*/
function () {
  function Map(sheet) {
    var cells = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [[]];
    var walkable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, Map);

    this.x = 0; // Position required for camera rendering check

    this.y = 0;
    this.walkable = 0;
    this.repeat = false;
    this.parallax = 0;
    this.sheet = sheet;
    this.walkable = walkable;
    this.populate(cells);
  }

  _createClass(Map, [{
    key: "tick",
    value: function tick() {
      return true;
    }
  }, {
    key: "populate",
    value: function populate(cells) {
      this.cells = cells;
      this.cellH = this.cells.length;
      this.cellW = this.cells[0].length;
      this.h = this.cellH * this.sheet.h;
      this.w = this.cellW * this.sheet.w;
    }
  }, {
    key: "render",
    value: function render(gfx, camera) {
      if (!camera) {
        camera = {
          x: 0,
          y: 0,
          w: gfx.w,
          h: gfx.h,
          zoom: 1
        };
      }

      var tw = this.sheet.w;
      var th = this.sheet.h;
      var cellW = this.sheet.cellW;
      var cellH = this.sheet.cellH;
      var stx = (camera.x - camera.x * this.parallax) / tw | 0;
      var sty = (camera.y - camera.y * this.parallax) / th | 0;
      var endx = stx + (camera.w / camera.zoom / tw | 0) + 1;
      var endy = sty + (camera.h / camera.zoom / th | 0) + 1;
      var j;
      var i;
      var cell;

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

          this.sheet.render(gfx, (cell - 1) % cellW | 0, (cell - 1) / cellW | 0, i * tw, j * th);
        }
      }

      if (this.parallax) {
        gfx.ctx.restore();
      }
    }
  }, {
    key: "getBlockCell",
    value: function getBlockCell(block) {
      var row = block[1] / this.sheet.h | 0;
      var col = block[0] / this.sheet.w | 0;

      if (row < 0 || row > this.cellH - 1) {
        row = -1;
      }

      if (col < 0 || col > this.cellW - 1) {
        col = -1;
      }

      return [col, row];
    }
  }, {
    key: "getCellPixels",
    value: function getCellPixels(block) {
      var row = block[1] * this.sheet.h;
      var col = block[0] * this.sheet.w;
      return [col, row];
    }
  }, {
    key: "getBlock",
    value: function getBlock(block) {
      var row = block[1] / this.sheet.h | 0;
      var col = block[0] / this.sheet.w | 0;

      if (row < 0 || row > this.cellH - 1) {
        return;
      }

      return this.cells[row][col];
    }
  }, {
    key: "getBlocks",
    value: function getBlocks(blocks) {
      return blocks.map(this.getBlock, this);
    }
  }, {
    key: "getBlockEdge",
    value: function getBlockEdge(pos, vertical) {
      var snapTo = vertical ? this.sheet.h : this.sheet.w;
      return math.snap(pos, snapTo);
    }
  }, {
    key: "setBlock",
    value: function setBlock(pos, block) {
      var row = pos[1] / this.sheet.h | 0,
          col = pos[0] / this.sheet.w | 0;

      if (row < 0 || row > this.cellH - 1 || col < 0 || col > this.cellW - 1) {
        return;
      }

      this.cells[row][col] = block;
    }
  }, {
    key: "setBlockCell",
    value: function setBlockCell(pos, block) {
      var row = pos[1],
          col = pos[0];

      if (row < 0 || row > this.cellH - 1 || col < 0 || col > this.cellW - 1) {
        return;
      }

      this.cells[row][col] = block;
    }
  }]);

  return Map;
}();

module.exports = Map;