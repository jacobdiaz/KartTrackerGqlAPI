const { model, Schema } = require("mongoose");

const raceDataSchema = new Schema({
  position: {
    type: String,
    required: true,
  },
  kartNum: {
    type: String,
    required: true,
  },
  raceType: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },

  track: {
    type: String,
  },
  userId: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("RaceData", raceDataSchema);
