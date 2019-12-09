"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Entity =
/*#__PURE__*/
function () {
  function Entity() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var w = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 32;
    var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 32;

    _classCallCheck(this, Entity);

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
    var t = this.traits || [];
    this.traits = [];
    this.mixin(t);
  }

  _createClass(Entity, [{
    key: "tick",
    value: function tick() {
      var _this = this;

      this.traits = this.traits.filter(function (t) {
        return t.tick.call(_this, t);
      });
      return !this.remove;
    }
  }, {
    key: "add",
    value: function add(body, tag, zIndex) {
      if (!this.bodies) {
        this.bodies = [];
      }

      this.bodies.push([body, tag, zIndex]);
      return body;
    }
  }, {
    key: "mixin",
    value: function mixin(traits) {
      traits.forEach(function (t) {
        if (t.trait) {
          var trait = new t.trait();
          trait.init_trait.apply(this, [trait].concat(trait.makeArgs(t)));
          this.traits.push(trait);
        }
      }, this);
    }
  }, {
    key: "hit",
    value: function hit(entity) {}
  }, {
    key: "hitBlocks",
    value: function hitBlocks(xBlocks, yBlocks) {}
  }, {
    key: "moveBy",
    value: function moveBy(xo, yo) {
      this.xo = xo;
      this.yo = yo;
    }
    /*
      x & y is the amount the entity WANTS to move,
      if there were no collision with the map.
    */

  }, {
    key: "move",
    value: function move(x, y, map) {
      // Temp holder for movement
      var xo, yo;
      var xv, yv;
      var hitX = false;
      var hitY = false;
      var xBlocks;
      var yBlocks; // Apply simple gravity

      if (this.falling) {
        y += this.gravity;
      }

      xo = x;
      yo = y;
      xv = this.x + xo;
      yv = this.y + yo; // check blocks given vertical movement TL, BL, TR, BR

      yBlocks = map.getBlocks([[this.x, yv], [this.x, yv + (this.h - 1)], [this.x + (this.w - 1), yv], [this.x + (this.w - 1), yv + (this.h - 1)]]); // if overlapping edges, move back a little

      if (y < 0 && (yBlocks[0] > map.walkable || yBlocks[2] > map.walkable)) {
        // Hmmm... why only this guy needs to be floored?
        yo = map.getBlockEdge((yv | 0) + map.sheet.h, "VERT") - this.y;
        hitY = true;
      }

      if (y > 0 && (yBlocks[1] > map.walkable || yBlocks[3] > map.walkable)) {
        yo = map.getBlockEdge(yv + this.h, "VERT") - this.y - this.h;
        hitY = true;
      } // Add the allowed Y movement


      this.y += yo; // Now check blocks given horizontal movement TL, BL, TR, BR

      xBlocks = map.getBlocks([[xv, this.y], [xv, this.y + (this.h - 1)], [xv + (this.w - 1), this.y], [xv + (this.w - 1), this.y + (this.h - 1)]]); // if overlapping edges, move back a little

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
      } // Add the allowed X movement


      this.x += xo; // check if we're falling

      yBlocks = map.getBlocks([[this.x, this.y + this.h], [this.x + (this.w - 1), this.y + this.h]]);
      this.wasFalling = this.falling;

      if (yBlocks[0] <= map.walkable && yBlocks[1] <= map.walkable) {
        this.falling = true;
      } else {
        this.falling = false;
      } // Reset offset amount


      this.xo = 0;
      this.yo = 0;
      return [xo, yo];
    }
  }, {
    key: "render",
    value: function render(gfx) {
      var c = gfx.ctx;
      c.fillStyle = "#c00";
      c.fillRect(this.x, this.y, this.w, this.h);
    }
  }]);

  return Entity;
}();

module.exports = Entity;