// What are the graphQL types we are expecting to have in our Apollo server
const { gql } = require("apollo-server");

module.exports = gql`
  # Types
  type Kart {
    id: ID!
    kartNum: String!
    handlingRatings: [Rating!]!
    speedRatings: [Rating!]!
    brakingRatings: [Rating!]!
  }

  type Rating {
    id: ID!
    value: Float!
    date: String!
  }

  # Inputs
  input KartInput {
    kartNum: String!
    handlingRatings: [RatingInput!]!
    speedRatings: [RatingInput!]!
    brakingRatings: [RatingInput!]!
  }

  input KartEditInput {
    kartNum: String
    handlingRatings: [RatingInput!]
    speedRatings: [RatingInput!]
    brakingRatings: [RatingInput!]
  }

  input RatingInput {
    value: Float!
    date: String
  }

  type Query {
    kart(ID: ID!): Kart!
    getKarts(amount: Int): [Kart]
  }

  type Mutation {
    createKart(kartInput: KartInput): Kart!
    deleteKart(ID: ID!): Boolean! #delete kart by an id
    editKart(ID: ID!, kartInput: KartEditInput): Boolean # Allow a users to edit name and desc.
  }
`;
