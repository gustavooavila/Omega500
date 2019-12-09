"use strict";

var preloading = true;
var pageLoaded = false;
var assetsToLoad = 0;
var maxAssets = 0;
var timers = [];
var Ω = {
  evt: {
    onloads: [],
    progress: [],
    onload: function onload(func) {
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
  preload: function preload(name) {
    var _this = this;

    if (!preloading) {
      return function () {// console.log("preloading finished!", name);
      };
    }

    maxAssets = Math.max(++assetsToLoad, maxAssets);
    return function () {
      assetsToLoad -= 1;

      _this.evt.progress.map(function (p) {
        return p(assetsToLoad, maxAssets);
      });

      if (assetsToLoad === 0 && pageLoaded) {
        if (!preloading) {
          console.error("Preloading finished (onload called) multiple times!");
        }

        preloading = false;

        _this.evt.onloads.map(function (o) {
          o();
        });
      }
    };
  },
  pageLoad: function pageLoad() {
    pageLoaded = true;

    if (maxAssets === 0 || assetsToLoad === 0) {
      // No assets to load, so fire onload
      preloading = false;
      this.evt.onloads.map(function (o) {
        o();
      });
    }
  },
  timers: {
    add: function add(timer) {
      timers.push(timer);
    },
    tick: function tick() {
      timers = timers.filter(function (t) {
        return t.tick();
      });
    }
  },
  urlParams: function () {
    if (!window.location && !window.location.search) {
      return {};
    }

    var params = {};
    var match;
    var pl = /\+/g; // Regex for replacing addition symbol with a space

    var search = /([^&=]+)=?([^&]*)/g;

    var decode = function decode(s) {
      return decodeURIComponent(s.replace(pl, " "));
    };

    var query = window.location.search.substring(1);

    while (match = search.exec(query)) {
      params[decode(match[1])] = decode(match[2]);
    }

    return params;
  }()
};
module.exports = Ω;