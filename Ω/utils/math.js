const math = {

  dist: (a, b) => {

    const dx = a.x ? a.x - b.x : a[0] - b[0];
    const dy = a.y ? a.y - b.y : a[1] - b[1];

    return Math.sqrt(dx * dx + dy * dy);
  },

  distCenter: (a, b) => {

    const dx = (a.x + (a.w / 2)) - (b.x + (b.w / 2));
    const dy = (a.y + (a.h / 2)) - (b.y + (b.h / 2));

    return Math.sqrt(dx * dx + dy * dy);
  },

  center: (e, zoom = 1) => ({
    x: e.x + e.w / zoom / 2,
    y: e.y + e.h / zoom / 2
  }),


  rotate: (angle, point, origin = [0, 0]) => {
    const ox = Math.cos(angle) * (point[0] - origin[0]) - Math.sin(angle) * (point[1] - origin[1]) + origin[0];
    const oy = Math.sin(angle) * (point[0] - origin[0]) + Math.cos(angle) * (point[1] - origin[1]) + origin[1];
    return [ox, oy];
  },

  degToRad: (deg) => deg * Math.PI / 180,

  radToDeg: (rad) => rad * 180 / Math.PI,

  angleBetween: (a, b) => {

    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const angle = Math.atan2(dy, dx);

    return angle;// % Math.PI;

  },

  snap: (value, snapSize) => Math.floor(value / snapSize) * snapSize,

  snapRound: (value, snapSize) => {

    const steps = value / snapSize | 0;

    const remain = value - (steps * snapSize);
    const rounder = remain > (snapSize / 2) ? Math.ceil : Math.floor;

    return rounder(value / snapSize) * snapSize;
  },

  clamp: (val, min, max) => Math.max(min, Math.min(max, val)),

  ratio: (start, finish, amount) => this.clamp((amount - start) / (finish - start), 0, 1),

  lerp: (start, finish, amount) => amount * this.ratio(start, finish, amount),


  // This is ease.linear
  lerpPerc: (start, finish, perc) => ((finish - start) * perc) + start,

  smoothstep: (start, finish, amount) => {

    const x = this.ratio(start, finish, amount);

    return amount * (x * x * x * (x * (x * 6 - 15) + 10)); //(x*x*(3 - 2*x));
  },

  ease: {

    // TODO: add more Robert Penner goodness

    linear: (start, end, perc) => (end - start) * perc + start,

    inOutQuad: (start, end, perc) => start + ((end - start) / 2) * (perc < 0.5 ? 2 * perc * perc : -2 * perc * (perc - 2) - 1),

    bounce: (start, end, perc) => {
      const pp = perc * perc;
      const ppp = pp * perc;
      return start + (end - start) * (33 * ppp * pp + -106 * pp * pp + 126 * ppp + -67 * pp + 15 * perc);
    }

  }

};

module.exports = math;
