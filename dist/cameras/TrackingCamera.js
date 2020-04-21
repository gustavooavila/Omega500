"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Camera = require("./Camera");

var math = require('../utils/math');

var TrackingCamera =
/*#__PURE__*/
function (_Camera) {
  _inherits(TrackingCamera, _Camera);

  function TrackingCamera(entity) {
    var _this;

    var w = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var h = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var bounds = arguments.length > 3 ? arguments[3] : undefined;

    _classCallCheck(this, TrackingCamera);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TrackingCamera).call(this, 0, 0, w, h));
    _this.xRange = entity.w;
    _this.yRange = entity.h;
    _this.zoom = 1;
    _this.bounds = bounds;

    _this.track(entity);

    return _this;
  }

  _createClass(TrackingCamera, [{
    key: "track",
    value: function track(entity) {
      this.entity = entity;
      this.x = entity.x - this.w / this.zoom / 2 + entity.w / this.zoom / 2;
      this.y = entity.y - this.h / this.zoom / 2 + entity.h / this.zoom / 2;
      this.constrainToBounds();
    }
  }, {
    key: "constrainToBounds",
    value: function constrainToBounds() {
      if (this.x <= 0) {
        this.x = 0;
      } else {
        if (this.bounds && this.x + this.w / this.zoom > this.bounds[0]) {
          this.x = this.bounds[0] - this.w / this.zoom;
        }
      }

      if (this.y <= 0) {
        this.y = 0;
      } else {
        if (this.bounds && this.y + this.h / this.zoom > this.bounds[1]) {
          this.y = this.bounds[1] - this.h / this.zoom;
        }
      }
    }
  }, {
    key: "tick",
    value: function tick() {
      var center = math.center(this, this.zoom);
      var e = this.entity;
      var xr = this.xRange;
      var yr = this.yRange;

      if (e.x < center.x - xr) {
        this.x = e.x - this.w / this.zoom / 2 + xr;
      }

      if (e.x + e.w > center.x + xr) {
        this.x = e.x + e.w - this.w / this.zoom / 2 - xr;
      }

      if (e.y < center.y - yr) {
        this.y = e.y - this.h / this.zoom / 2 + yr;
      }

      if (e.y + e.h > center.y + yr) {
        this.y = e.y + e.h - this.h / this.zoom / 2 - yr;
      }

      this.constrainToBounds();
    }
  }, {
    key: "debugOutline",
    value: function debugOutline() {
      return {
        render: function render(gfx, cam) {
          var center = math.center(cam, cam.zoom);
          gfx.ctx.strokeStyle = "rgba(200, 255, 255, 1)";
          gfx.ctx.strokeRect(center.x - cam.xRange, center.y - cam.yRange, cam.xRange * 2, cam.yRange * 2);
        }
      };
    }
  }, {
    key: "render",
    value: function render(gfx, renderables) {
      var prePost = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      if (this.debug) renderables = renderables.concat([this.debugOutline()]);

      _get(_getPrototypeOf(TrackingCamera.prototype), "render", this).call(this, gfx, renderables, prePost);
    }
  }]);

  return TrackingCamera;
}(Camera);

module.exports = TrackingCamera;