const { model, Schema } = require("mongoose");
const rating = {
  value: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
};

const kartSchema = new Schema({
  userId: { type: String, required: true },
  kartNum: {
    type: String,
    required: true,
  },
  trackId: String,
  handlingRatings: rating,
  speedRatings: rating,
  brakingRatings: rating,
});
module.exports = model("Kart", kartSchema);
