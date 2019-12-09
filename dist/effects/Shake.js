"use strict";

(function (Ω) {
  "use strict";

  var Shake = Ω.Class.extend({
    init: function init(time) {
      this.time = time || 10;
    },
    tick: function tick() {
      return this.time--;
    },
    render: function render(gfx) {
      gfx.ctx.translate(Math.random() * 8 | 0, Math.random() * 4 | 0);
    }
  });
  Ω.Shake = Shake;
})(window.Ω);