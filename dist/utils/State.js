"use strict";

(function (Ω) {
  "use strict";

  var State = function State(state) {
    this.state = state;
    this.last = "";
    this.count = -1;
    this.locked = false; // Um, why is this feature necessary?
  };

  State.prototype = {
    set: function set(state, resetIfSame) {
      if (this.locked || state === this.state && !resetIfSame) {
        return;
      }

      this.last = this.state;
      this.state = state;
      this.count = -1;
    },
    get: function get() {
      return this.state;
    },
    tick: function tick() {
      this.count++;
    },
    first: function first() {
      return this.count === 0;
    },
    is: function is(state) {
      return state === this.state;
    },
    isNot: function isNot(state) {
      return !this.is(state);
    },
    isIn: function isIn() {
      var state = this.state,
          args = Array.prototype.slice.call(arguments);
      return args.some(function (s) {
        return s === state;
      });
    },
    isNotIn: function isNotIn() {
      return !this.isIn.apply(this, arguments);
    }
  };
  Ω.utils = Ω.utils || {};
  Ω.utils.State = State;
})(window.Ω);