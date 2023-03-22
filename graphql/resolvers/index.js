const kartsResolver = require("./karts");
const usersResolver = require("./users");
const tracksResolver = require("./tracks");
const raceDataResolver = require("./racedatas");

module.exports = {
  Query: {
    ...kartsResolver.Query,
    ...usersResolver.Query,
    ...tracksResolver.Query,
    ...raceDataResolver.Query,
  },
  Mutation: {
    ...kartsResolver.Mutation,
    ...usersResolver.Mutation,
    ...tracksResolver.Mutation,
    ...raceDataResolver.Mutation,
  },
};
