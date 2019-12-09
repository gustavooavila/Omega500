"use strict";

(function (Ω) {
  "use strict";

  var Trait = Ω.Class.extend({
    // Convert a property list to an argument array
    // based on the nees of the trait.
    makeArgs: function makeArgs() {
      return [];
    },
    init: function init() {},
    init_trait: function init_trait() {},
    tick: function tick() {
      return true;
    }
  });
  Ω.Trait = Trait;
})(window.Ω);