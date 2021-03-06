const Stats = function () {

  let startTime = Date.now();
  let previous = startTime;
  let fpsCur = 0;
  let fpsMin = 100;
  let fpsMax = 0;
  let ticks = 0;

  return {

    pos: [Ω.env.w - 53, 3],

    start: function () {

      startTime = Date.now();

    },

    fps: function () {

      return [fpsCur, fpsMin, fpsMax];

    },

    stop: function () {

      var now = Date.now();

      ticks++;

      if (now > previous + 1000) {
        fpsCur = Math.round((ticks * 1000) / (now - previous));
        fpsMin = Math.min(fpsMin, fpsCur);
        fpsMax = Math.max(fpsMax, fpsCur);

        previous = now;
        ticks = 0;
      }

    }
  };
};

module.exports = Stats;
