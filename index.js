const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
require("dotenv").config();

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });
// mongoose.set("strictQuery", false);
// mongoose
//   .connect(process.env.KART_API_KEY, { useNewUrlParser: true })
//   .then(() => server.listen({ port: process.env.PORT || 4000 }))
//   .then(({ url }) => {
//     console.log(`Server running at ${url} `);
//   });

console.log(process.env.KART_API_KEY);
