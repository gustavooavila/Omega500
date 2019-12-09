"use strict";

var Stats = function Stats() {
  var startTime = Date.now();
  var previous = startTime;
  var fpsCur = 0;
  var fpsMin = 100;
  var fpsMax = 0;
  var ticks = 0;
  return {
    pos: [Ω.env.w - 53, 3],
    start: function start() {
      startTime = Date.now();
    },
    fps: function fps() {
      return [fpsCur, fpsMin, fpsMax];
    },
    stop: function stop() {
      var now = Date.now();
      ticks++;

      if (now > previous + 1000) {
        fpsCur = Math.round(ticks * 1000 / (now - previous));
        fpsMin = Math.min(fpsMin, fpsCur);
        fpsMax = Math.max(fpsMax, fpsCur);
        previous = now;
        ticks = 0;
      }
    }
  };
};

module.exports = Stats;