"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Camera =
/*#__PURE__*/
function () {
  function Camera() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var w = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    _classCallCheck(this, Camera);

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.zoom = 1;
    this.debug = false;
  }

  _createClass(Camera, [{
    key: "tick",
    value: function tick() {}
  }, {
    key: "moveTo",
    value: function moveTo(x, y) {
      this.x = x;
      this.y = y;
    }
  }, {
    key: "moveBy",
    value: function moveBy(x, y) {
      this.x += x;
      this.y += y;
    }
  }, {
    key: "renderPre",
    value: function renderPre(gfx) {
      var c = gfx.ctx;
      c.save();
      c.scale(this.zoom, this.zoom);
      c.translate(-Math.round(this.x), -Math.round(this.y));
    }
  }, {
    key: "renderPost",
    value: function renderPost(gfx) {
      var c = gfx.ctx;

      if (this.debug) {
        c.strokeStyle = "red";
        c.strokeRect(this.x, this.y, this.w / this.zoom, this.h / this.zoom);
      }

      c.restore();
    }
  }, {
    key: "render",
    value: function render(gfx, renderables) {
      var _this = this;

      var prePost = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      prePost && this.renderPre(gfx);
      renderables // Flatten to an array
      .reduce(function (acc, e) {
        if (Array.isArray(e)) {
          return acc.concat(e);
        }

        acc.push(e);
        return acc;
      }, []) // Remove out-of-view entities
      // TODO: maybe use quad tree for this?
      .filter(function (r) {
        return r.repeat || !(r.x + r.w < _this.x || r.y + r.h < _this.y || r.x > _this.x + _this.w / _this.zoom || r.y > _this.y + _this.h / _this.zoom);
      }) // Draw 'em
      .forEach(function (r) {
        r.render(gfx, _this);
      });
      prePost && this.renderPost(gfx);
    }
  }]);

  return Camera;
}();

module.exports = Camera;