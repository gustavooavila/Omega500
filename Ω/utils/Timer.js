
class Timer {

  constructor(time, cb, done) {

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

  tick() {

    this.time -= 1;

    if (this.time < 0) {
      this.done && this.done();
      return false;
    }
    this.cb && this.cb(1 - (this.time / this.max));

    return true;
  }

}

const timer = function (time, cb, done) {
  return new Timer(time, cb, done);
};

module.exports = timer;

