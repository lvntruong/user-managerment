const mongoose = require("mongoose");
const configs = require("../configs");

const { DB_CONNECTION_URI } = configs;

mongoose.connect(
  DB_CONNECTION_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err)
      return console.error("There was an error connecting to database.", err);
    console.log("Database connected!");
  }
);
