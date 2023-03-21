const kartsResolver = require("./karts");
const usersResolver = require("./users");
const tracksResolver = require("./tracks");
const raceDataResolver = require("./raceData");

module.exports = {
  Query: {
    ...kartsResolver.Query,
    ...usersResolver.Query,
    ...tracksResolver.Query,
    ...kartsResolver.Query,
  },
  Mutation: {
    ...kartsResolver.Mutation,
    ...usersResolver.Mutation,
    ...tracksResolver.Mutation,
    ...raceDataResolver.Mutation,
  },
};
