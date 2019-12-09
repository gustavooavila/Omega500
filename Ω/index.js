const Ω = require("./Ω");

const assets = require("./assets/index");
const entities = require("./entities/index");
const gfx = require("./gfx/index");
const input = require("./input/index");
const screens = require("./screens/index");
const utils = require("./utils/index");
const Game = require("./Game");
global.Ω = Ω;

module.exports = {
  ...Ω,
  ...assets,
  ...entities,
  ...gfx,
  ...input,
  ...screens,
  ...utils,
  Game,
}