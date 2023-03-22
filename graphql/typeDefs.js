// What are the graphQL types we are expecting to have in our Apollo server
const { gql } = require("apollo-server");

module.exports = gql`
  # Types
  type Kart {
    id: ID!
    userId: ID!
    trackId: String
    kartNum: String!
    handlingRatings: Rating!
    speedRatings: Rating!
    brakingRatings: Rating!
  }
  type Rating {
    value: Float!
    date: String!
  }
  type User {
    id: ID!
    email: String
    password: String
    token: String
  }
  type Track {
    id: ID!
    userIds: [String]
    trackName: String
  }

  type RaceData {
    id: ID!
    kartNum: String!
    position: String!
    raceType: String!
    time: String!
    track: String!
    userId: String!
  }
  # Inputs
  input RegisterInput {
    email: String
    password: String
  }
  input LoginInput {
    email: String
    password: String
  }
  input KartInput {
    userId: ID!
    kartNum: String!
    trackId: String
    handlingRatings: RatingInput!
    speedRatings: RatingInput!
    brakingRatings: RatingInput!
  }
  input KartEditInput {
    id: ID!
    kartNum: String
    handlingRatings: RatingInput!
    speedRatings: RatingInput!
    brakingRatings: RatingInput!
  }
  input RatingInput {
    value: Float!
    date: String
  }
  input TrackInput {
    userIds: [String]
    trackName: String
  }
  input CreateTrackInput {
    userId: String
    trackName: String
  }

  input RaceDataInput {
    kartNum: String!
    position: String!
    raceType: String!
    time: String!
    track: String!
    userId: String!
  }

  input RaceDataEditInput {
    id: ID!
    kartNum: String
    position: String
    raceType: String
    time: String
    track: String
    userId: String
  }

  # Queries
  type Query {
    kart(ID: ID!): Kart
    getKarts(amount: Int): [Kart]
    getUserKarts(userId: ID!): [Kart]
    user(ID: ID!): User
    getUsersTracks(userId: ID!): [Track]
    getTracksKarts(trackId: ID!): [Kart]
    getTrack(trackId: ID!): Track
    getRaceData(amount: Int): [RaceData]
    getUserRaceData(userId: ID!): [RaceData]
  }
  type Mutation {
    # kart
    createKart(kartInput: KartInput): Kart!
    deleteKart(ID: ID!): Boolean!
    editKart(kartInput: KartEditInput): Boolean # Allow a users to edit name and desc.
    # User
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    # Tracks
    createTrack(createTrackInput: CreateTrackInput): Track
    deleteTrack(trackId: ID!): Boolean!

    # RaceData
    createRaceData(raceDataInput: RaceDataInput): RaceData
    editRaceData(raceDataEditInput: RaceDataEditInput): Boolean
    deleteRaceData(raceDataID: ID!): Boolean!
  }
`;
