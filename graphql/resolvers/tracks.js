const Track = require("../../models/Track");
const capFirstLetter = require("../../utils/index");
const Kart = require("../../models/Kart");
module.exports = {
  Query: {
    async getTracksKarts(_, { trackId }) {
      const query = { trackId: trackId };
      return await Kart.find(query);
    },

    async getUsersTracks(_, { userId }) {
      const query = { userIds: { $in: [userId] } };
      const tracks = await Track.find(query);
      return tracks;
    },

    async getTrack(_, { trackId }) {
      return await Track.findById(trackId);
    },
  },
  Mutation: {
    async createTrack(_, { createTrackInput: { userId, trackName } }) {
      // TODO Create a track with address
      const trackNameCap = capFirstLetter(trackName);

      const trackExsists = await Track.findOne({ trackName: trackNameCap });
      if (trackExsists) throw new Error("Track already exsists");

      const createdTrack = new Track({
        userIds: [userId],
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
