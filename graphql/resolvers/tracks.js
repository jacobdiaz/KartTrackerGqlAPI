const Track = require("../../models/Track");
const capFirstLetter = require("../../utils/index");

module.exports = {
  Query: {
    //
  },
  Mutation: {
    async createTrack(_, { createTrackInput: { userId, trackName } }) {
      // TODO Create a track with address
      const trackNameCap = capFirstLetter(trackName);

      const trackExsists = await Track.findOne({ trackName: trackNameCap });
      if (trackExsists) throw new Error("Track already exsists");
      // TODO Add kart id array to track
      const createdTrack = new Track({
        userIds: [userId], // init array with the userId who created
        trackName: trackNameCap,
      });

      const res = await createdTrack.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },
  },
};
