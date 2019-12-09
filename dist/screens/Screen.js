"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Screen =
/*#__PURE__*/
function () {
  function Screen() {
    _classCallCheck(this, Screen);

    this.loaded = true; // Set to false if you want to do async stuff

    this.frame = 0;
    this.bodies = null; // Holds new bodies to be added next tick

    this._bodies = null; // Current dictionary of active bodies

    this._bodies_zindex = null; // Holds zIndex for body dictionary

    this.camera = null;
  }

  _createClass(Screen, [{
    key: "tick",
    value: function tick() {}
  }, {
    key: "_tick",
    value: function _tick() {
      this.frame++;

      if (this._bodies) {
        // Erfph... make this all nicer, yo.
        // Add any new bodies
        this.bodies = this.bodies.filter(function (r) {
          var body = r[0];
          var tag = r[1] || "default";
          var zIndex = r[2] || 99; //WARNING: index can't be falsey

          var spliced = false;
          var i;

          if (!this._bodies[tag]) {
            this._bodies[tag] = []; // Re-order the zIndexes

            for (i = 0; i < this._bodies_zindex.length; i++) {
              if (zIndex < this._bodies_zindex[i][0]) {
                this._bodies_zindex.splice(i, 0, [zIndex, tag]);

                spliced = true;
                break;
              }
            }

            if (!spliced) {
              this._bodies_zindex.push([zIndex, tag]);
            }
          }

          this._bodies[tag].push(body);

          return false;
        }, this); // Tick all the active bodies

        for (var tag in this._bodies) {
          this._bodies[tag] = this._bodies[tag].filter(function (body) {
            var _this = this;

            // Automagically remove any "remove"d entities
            var stillAlive = body.tick() && !body.remove; // Add any children bodies

            if (body.bodies) {
              body.bodies = body.bodies.filter(function (b) {
                _this.add(b[0], b[1], b[2]);

                return false;
              });
            }

            return stillAlive;
          });
        }
      }

      this.tick();
    }
  }, {
    key: "add",
    value: function add(body, tag, zIndex) {
      // "Lazyily" Set up the bodies structure.
      if (!this._bodies) {
        this.bodies = [];
        this._bodies_zindex = [[99, "default"]];
        this._bodies = {
          "default": []
        };
      }

      this.bodies.push([body, tag, zIndex]);
      return body;
    }
  }, {
    key: "get",
    value: function get(tag) {
      return this._bodies[tag] || [];
    }
  }, {
    key: "clear",
    value: function clear(gfx, col) {
      if (this.camera) {
        var c = gfx.ctx;
        c.fillStyle = col;
        c.fillRect(this.camera.x, this.camera.y, this.camera.w, this.camera.h);
      } else {
        gfx.clear(col);
      }
    }
  }, {
    key: "render",
    value: function render(gfx) {
      var c = gfx.ctx;
      c.fillStyle = "hsl(0, 0%, 0%)";
      c.fillRect(0, 0, gfx.w, gfx.h);
    }
  }, {
    key: "_render",
    value: function _render(gfx) {
      this.renderBG && this.renderBG(gfx);

      if (this.camera) {
        // Render from camera position
        this.camera.renderPre(gfx);
        this.render(gfx, this.camera);

        if (this._bodies) {
          var bodies = [];

          this._bodies_zindex.forEach(function (bz) {
            bodies.push(this._bodies[bz[1]]);
          }, this);

          this.camera.render(gfx, bodies, true);
        }

        this.camera.renderPost(gfx);
      } else {
        // Render over entire view port
        this.render(gfx);

        if (this._bodies) {
          // Render the bodies in zIndex order
          this._bodies_zindex.forEach(function (bz) {
            this._bodies[bz[1]].forEach(function (b) {
              b.render(gfx);
            }, this);
          }, this);
        }
      }

      this.renderFG && this.renderFG(gfx);
    }
  }]);

  return Screen;
}();

module.exports = Screen;