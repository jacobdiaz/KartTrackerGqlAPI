const { model, Schema } = require("mongoose");

const trackSchema = new Schema({
  userIds: { type: Array, required: true },
  trackName: { type: String, required: true },
});

module.exports = model("Track", trackSchema);
