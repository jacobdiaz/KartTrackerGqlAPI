// Resolvers are querys or mutations that we can make to our database.
const Kart = require("../models/Kart");

module.exports = {
  Query: {
    // Get a Kart
    async kart(_, { ID }) {
      return await Kart.findById(ID); //FindByID is a mongoose method -> Of type Recipe find the ID
    },
    // Get us {amount} number of recipes
    async getKarts(_, { amount }) {
      return await Kart.find().limit(amount);
    },
  },
  Mutation: {
    async createKart(
      _,
      { kartInput: { kartNum, handlingRatings, speedRatings, brakingRatings } }
    ) {
      const createdKart = new Kart({
        kartNum: kartNum,
        handlingRatings: handlingRatings,
        speedRatings: speedRatings,
        brakingRatings: brakingRatings,
      });

      const res = await createdKart.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },

    async deleteKart(_, { ID }) {
      const wasDeleted = (await Kart.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
    },

    async editKart(
      _,
      {
        ID,
        kartInput: { kartNum, handlingRatings, speedRatings, brakingRatings },
      }
    ) {
      const wasEdited = (
        await Kart.updateOne(
          { _id: ID },
          {
            kartNum: kartNum,
            handlingRatings: handlingRatings,
            speedRatings: speedRatings,
            brakingRatings: brakingRatings,
          }
        )
      ).modifiedCount;
      return wasEdited;
    },
  },
};
