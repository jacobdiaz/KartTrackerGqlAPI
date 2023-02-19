// What are the graphQL types we are expecting to have in our Apollo server
const { gql } = require("apollo-server");

module.exports = gql`
  # Types
  type Kart {
    id: ID!
    userId: ID!
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

  type User {
    username: String
    email: String
    password: String
    token: String
  }
  type Message {
    text: String
    createdAt: String
    createdBy: String
  }

  # Inputs
  input RegisterInput {
    username: String
    email: String
    password: String
    confirmPassword: String
  }

  input LoginInput {
    email: String
    password: String
  }

  input MessageInput {
    text: String
    username: String
  }

  input KartInput {
    userId: ID!
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
    kart(ID: ID!): Kart
    getKarts(amount: Int): [Kart]
    getUserKarts(userId: ID!): [Kart]
    user(ID: ID!): User
  }

  type Mutation {
    # kart
    createKart(kartInput: KartInput): Kart!
    deleteKart(ID: ID!): Boolean! #delete kart by an id
    editKart(ID: ID!, kartInput: KartEditInput): Boolean # Allow a users to edit name and desc.
    # User
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
  }
`;
