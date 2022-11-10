const mongoose = require("mongoose");
require("dotenv").config();


//Connect your Database
//May vary based if you decide to use an other Database
async function connectDatabase() {
  try {

    await mongoose.connect(process.env.MONGOLAB_URI);
    console.log("connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

module.exports = connectDatabase;
