const RaceData = require("../../models/RaceData");

module.exports = {
  Query: {},
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
  },
};
