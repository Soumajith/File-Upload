const mongoose = require("mongoose");
require("dotenv").config();

const dbconnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParse: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Databse connected");
    })
    .catch((e) => {
      console.log(e);
      process.exit(1);
    });
};

module.exports = dbconnect;
