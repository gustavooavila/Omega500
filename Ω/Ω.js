let preloading = true;
let pageLoaded = false;
let assetsToLoad = 0;
let maxAssets = 0;
let timers = [];

const Ω = {

  evt: {
    onloads: [],
    progress: [],
    onload: function (func) {
      if (!pageLoaded) {
        this.onloads.push(func);
      } else {
        // Page already loaded... so call it up.
        func();
      }
    }
  },

  env: {
    x: 0,
    y: 0,
    w: 0,
    h: 0
  },

  preload: function (name) {

    if (!preloading) {
      return function () {
        // console.log("preloading finished!", name);
      };
    }

    maxAssets = Math.max(++assetsToLoad, maxAssets);

    return () => {

      assetsToLoad -= 1;

      this.evt.progress.map((p) => p(assetsToLoad, maxAssets));

      if (assetsToLoad === 0 && pageLoaded) {
        if (!preloading) {
          console.error("Preloading finished (onload called) multiple times!");
        }

        preloading = false;
        this.evt.onloads.map((o) => { o(); });
      }
    };
  },

  pageLoad: function () {

    pageLoaded = true;

    if (maxAssets === 0 || assetsToLoad === 0) {
      // No assets to load, so fire onload
      preloading = false;
      this.evt.onloads.map((o) => { o(); });
    }

  },

  timers: {

    add: function (timer) {

      timers.push(timer);

    },

    tick: function () {

      timers = timers.filter((t) => t.tick());

    }

  },

  urlParams: (function () {
    if (!window.location && !window.location.search) {
      return {};
    }
    const params = {};
    let match;
    const pl = /\+/g;  // Regex for replacing addition symbol with a space
    const search = /([^&=]+)=?([^&]*)/g;
    const decode = (s) => decodeURIComponent(s.replace(pl, " "));
    const query = window.location.search.substring(1);

    while (match = search.exec(query)) {
      params[decode(match[1])] = decode(match[2]);
    }

    return params;
  }())

};

module.exports = Ω
