const kartsResolver = require("./karts");
const usersResolver = require("./users");

module.exports = {
  Query: {
    ...kartsResolver.Query,
    ...usersResolver.Query,
  },
  Mutation: {
    ...kartsResolver.Mutation,
    ...usersResolver.Mutation,
  },
};
