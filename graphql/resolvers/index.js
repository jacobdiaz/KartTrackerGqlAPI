const kartsResolver = require("./karts");
const usersResolver = require("./users");
const tracksResolver = require("./tracks");

module.exports = {
  Query: {
    ...kartsResolver.Query,
    ...usersResolver.Query,
    ...tracksResolver.Query,
  },
  Mutation: {
    ...kartsResolver.Mutation,
    ...usersResolver.Mutation,
    ...tracksResolver.Mutation,
  },
};
