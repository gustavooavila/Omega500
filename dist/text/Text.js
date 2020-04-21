"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Text =
/*#__PURE__*/
function () {
  function Text(font) {
    var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    _classCallCheck(this, Text);

    this.x = x;
    this.y = y;
    this.font = font;
    this.text = text;
    this.updateSize();
  }

  _createClass(Text, [{
    key: "setText",
    value: function setText(text) {
      this.text = "".concat(text);
      this.updateSize();
    }
  }, {
    key: "setFont",
    value: function setFont(font) {
      this.font = font;
      this.updateSize();
    }
  }, {
    key: "updateSize",
    value: function updateSize() {
      this.w = this.font.w * this.text.length;
      this.h = this.font.h;
    }
  }, {
    key: "render",
    value: function render(gfx) {
      this.font.render(gfx, this.text, this.x, this.y);
    }
  }]);

  return Text;
}();

module.exports = Text;