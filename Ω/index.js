const Ω = require("./Ω");

const anim = require("./anim/index");
const assets = require("./assets/index");
const entities = require("./entities/index");
const gfx = require("./gfx/index");
const input = require("./input/index");
const screens = require("./screens/index");
const utils = require("./utils/index");
const Game = require("./Game");
const Cameras = require("./cameras/index");
const text = require("./text/index");
const maps = require("./maps/index");

global.Ω = Ω;

module.exports = {
  ...Ω,
  ...anim,
  ...assets,
  ...entities,
  ...gfx,
  ...input,
  ...screens,
  ...utils,
  ...Cameras,
  ...text,
  ...maps,
  Game,
}