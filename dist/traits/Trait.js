"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Trait =
/*#__PURE__*/
function () {
  _createClass(Trait, [{
    key: "makeArgs",
    // Convert a property list to an argument array
    // based on the nees of the trait.
    value: function makeArgs() {
      return [];
    }
  }]);

  function Trait() {
    _classCallCheck(this, Trait);
  }

  _createClass(Trait, [{
    key: "init_trait",
    value: function init_trait() {}
  }, {
    key: "tick",
    value: function tick() {
      return true;
    }
  }]);

  return Trait;
}();

module.exports = Trait;