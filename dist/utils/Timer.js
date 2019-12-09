"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Timer =
/*#__PURE__*/
function () {
  function Timer(time, cb, done) {
    _classCallCheck(this, Timer);

    global.Ω.timers.add(this);
    this.time = time;

    if (!done) {
      done = cb;
      cb = null;
    }

    this.max = time;
    this.cb = cb;
    this.done = done;
  }

  _createClass(Timer, [{
    key: "tick",
    value: function tick() {
      this.time -= 1;

      if (this.time < 0) {
        this.done && this.done();
        return false;
      }

      this.cb && this.cb(1 - this.time / this.max);
      return true;
    }
  }]);

  return Timer;
}();

var timer = function timer(time, cb, done) {
  return new Timer(time, cb, done);
};

module.exports = timer;