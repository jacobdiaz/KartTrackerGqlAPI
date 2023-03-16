// Resolvers are querys or mutations that we can make to our database.
const Kart = require("../../models/Kart");

module.exports = {
  Query: {
    // Get a Kart
    async kart(_, { ID }) {
      return await Kart.findById(ID); //FindByID is a mongoose method -> Of type Kart find the ID
    },
    // Get us {amount} number of Karts
    async getKarts(_, { amount }) {
      return await Kart.find().limit(amount);
    },

    async getUserKarts(_, { userId }) {
      // create a query to get all karts with the same userId
      const query = { userId: userId };
      return await Kart.find(query);
    },
  },
  Mutation: {
    async createKart(
      _,
      {
        kartInput: {
          userId,
          kartNum,
          handlingRatings,
          speedRatings,
          brakingRatings,
          trackId,
        },
      }
    ) {
      const createdKart = new Kart({
        userId: userId,
        kartNum: kartNum,
        trackId: trackId,
        handlingRatings: handlingRatings,
        speedRatings: speedRatings,
        brakingRatings: brakingRatings,
      });

      const kartExsists = await Kart.findOne({
        kartNum: kartNum,
        trackId: trackId,
      });

      if (kartExsists) throw new Error("Kart already exsists");

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
        kartInput: {
          id,
          kartNum,
          handlingRatings,
          speedRatings,
          brakingRatings,
        },
      }
    ) {
      const wasEdited = (
        await Kart.updateOne(
          { _id: id },
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
