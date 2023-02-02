// Resolvers are querys or mutations that we can make to our database.

const Recipe = require("../models/Recipe");

module.exports = {
  Query: {
    // Recipe is the same name in typeDefs.js
    async recipe(_, { ID }) {
      return await Recipe.findById(ID); //FindByID is a mongoose method -> Of type Recipe find the ID
    },

    // Get us {amount} number of recipes
    async getRecipes(_, { amount }) {
      return await Recipe.find().sort({ createdAt: -1 }).limit(amount);
    },
  },
  Mutation: {
    async createRecipe(_, { recipeInput: { name, description } }) {
      // Create a new instance of a recipe
      const createdRecipe = new Recipe({
        name: name,
        description: description,
        createdAt: new Date().toISOString(),
        thumbsUp: 0,
        thumbsDown: 0,
      });

      // Save this new recipe to the database
      const res = await createdRecipe.save();

      // Return the recipe to apollo server resolver
      return {
        id: res.id,
        ...res._doc, // _doc is the actual document that was created
      };
    },

    async deleteRecipe(_, { ID }) {
      // Delete a recipe by the id
      // DeletedCount will return 1 if something was deleted, 0 if nothing
      const wasDeleted = (await Recipe.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
    },

    async editRecipe(_, { ID, recipeInput: { name, description } }) {
      const wasEdited = (
        await Recipe.updateOne(
          { _id: ID },
          { name: name, description: description }
        )
      ).modifiedCount;

      // updateOne will return 1 if something was deleted, 0 if nothing
      return wasEdited;
    },
  },
};
