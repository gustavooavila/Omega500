"use strict";

(function (Ω) {
  "use strict";

  var math = {
    dist: function dist(a, b) {
      var dx = a.x ? a.x - b.x : a[0] - b[0],
          dy = a.y ? a.y - b.y : a[1] - b[1];
      return Math.sqrt(dx * dx + dy * dy);
    },
    distCenter: function distCenter(a, b) {
      var dx = a.x + a.w / 2 - (b.x + b.w / 2),
          dy = a.y + a.h / 2 - (b.y + b.h / 2);
      return Math.sqrt(dx * dx + dy * dy);
    },
    center: function center(e, zoom) {
      zoom = zoom || 1;
      return {
        x: e.x + e.w / zoom / 2,
        y: e.y + e.h / zoom / 2
      };
    },
    rotate: function rotate(angle, point, origin) {
      origin = origin || [0, 0];
      var ox = Math.cos(angle) * (point[0] - origin[0]) - Math.sin(angle) * (point[1] - origin[1]) + origin[0],
          oy = Math.sin(angle) * (point[0] - origin[0]) + Math.cos(angle) * (point[1] - origin[1]) + origin[1];
      return [ox, oy];
    },
    degToRad: function degToRad(deg) {
      return deg * Math.PI / 180;
    },
    radToDeg: function radToDeg(rad) {
      return rad * 180 / Math.PI;
    },
    angleBetween: function angleBetween(a, b) {
      var dx = a.x - b.x,
          dy = a.y - b.y,
          angle = Math.atan2(dy, dx);
      return angle; // % Math.PI;
    },
    snap: function snap(value, snapSize) {
      return Math.floor(value / snapSize) * snapSize;
    },
    snapRound: function snapRound(value, snapSize) {
      var steps = value / snapSize | 0,
          remain = value - steps * snapSize,
          rounder = remain > snapSize / 2 ? Math.ceil : Math.floor;
      return rounder(value / snapSize) * snapSize;
    },
    clamp: function clamp(val, min, max) {
      return Math.max(min, Math.min(max, val));
    },
    ratio: function ratio(start, finish, amount) {
      return this.clamp((amount - start) / (finish - start), 0, 1);
    },
    lerp: function lerp(start, finish, amount) {
      return amount * this.ratio(start, finish, amount);
    },
    lerpPerc: function lerpPerc(start, finish, perc) {
      // This is ease.linear
      return (finish - start) * perc + start;
    },
    smoothstep: function smoothstep(start, finish, amount) {
      var x = this.ratio(start, finish, amount);
      return amount * (x * x * x * (x * (x * 6 - 15) + 10)); //(x*x*(3 - 2*x));
    },
    ease: {
      // TODO: add more Robert Penner goodness
      linear: function linear(start, end, perc) {
        return (end - start) * perc + start;
      },
      inOutQuad: function inOutQuad(start, end, perc) {
        return start + (end - start) / 2 * (perc < 0.5 ? 2 * perc * perc : -2 * perc * (perc - 2) - 1);
      },
      bounce: function bounce(start, end, perc) {
        var pp = perc * perc,
            ppp = pp * perc;
        return start + (end - start) * (33 * ppp * pp + -106 * pp * pp + 126 * ppp + -67 * pp + 15 * perc);
      }
    }
  };
  Ω.math = math;
})(window.Ω);