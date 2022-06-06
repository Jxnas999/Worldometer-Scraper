const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    item: String,
    counter: String,
    category: String,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Data", dataSchema);
