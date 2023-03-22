const RaceData = require("../../models/RaceData");

module.exports = {
  Query: {
    async getRaceData(_, { amount }) {
      return await RaceData.find().limit(amount);
    },

    async getUserRaceData(_, { userId }) {
      return await RaceData.find({ userId: userId });
    },
  },
  Mutation: {
    async createRaceData(
      _,
      { raceDataInput: { position, kartNum, raceType, time, track, userId } }
    ) {
      const createdRaceData = new RaceData({
        position,
        kartNum,
        raceType,
        time,
        track,
        userId,
      });
      const res = await createdRaceData.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },

    async editRaceData(
      _,
      {
        raceDataEditInput: {
          id,
          position,
          kartNum,
          raceType,
          time,
          track,
          userId,
        },
      }
    ) {
      const wasEdited = (
        await RaceData.updateOne(
          { _id: id },
          {
            position: position,
            kartNum: kartNum,
            raceType: raceType,
            time: time,
            track: track,
            userId: userId,
          }
        )
      ).modifiedCount;
      return wasEdited;
    },

    async deleteRaceData(_, { raceDataID }) {
      const wasDeleted = (await RaceData.deleteOne({ _id: raceDataID }))
        .deletedCount;
      return wasDeleted;
    },
  },
};
