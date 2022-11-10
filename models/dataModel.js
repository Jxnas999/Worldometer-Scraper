const mongoose = require("mongoose");


//Database Schema... Can be changed if you want to use an other database
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
