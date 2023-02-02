// What are the graphQL types we are expecting to have in our Apollo server
const { gql } = require("apollo-server");

module.exports = gql`
  type Recipe {
    name: String
    description: String
    createdAt: String
    thumbsUp: Int
    thumbsDown: Int
  }
  # What the user will input
  input RecipeInput {
    name: String
    description: String
  }

  # Reading the information
  type Query {
    recipe(ID: ID!): Recipe!
    getRecipes(amount: Int): [Recipe]
  }

  type Mutation {
    createRecipe(recipeInput: RecipeInput): Recipe!
    deleteRecipe(ID: ID!): Boolean! #delete recipe by an id
    editRecipe(ID: ID!, recipeInput: RecipeInput): Boolean # Allow a users to edit name and desc.
  }
`;
