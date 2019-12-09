"use strict";

(function (Ω) {
  "use strict";

  var Flash = Ω.Class.extend({
    init: function init(time, color) {
      this.max = time || 10;
      this.time = this.max;
      this.color = color || "#fff";
    },
    tick: function tick() {
      this.ratio = 1 - this.time / this.max;
      return this.time--;
    },
    render: function render(gfx) {
      if (this.ratio > 0.5) {
        gfx.clear(this.color, 1 - (this.ratio - 0.5) * 2);
      } else {
        gfx.clear(this.color, this.ratio * 2);
      }
    }
  });
  Ω.Flash = Flash;
})(window.Ω);