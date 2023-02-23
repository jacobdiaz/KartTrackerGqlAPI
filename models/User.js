const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true }, // unique: true means that no other user can have the same email
  token: { type: String },
});

module.exports = model("User", userSchema);
