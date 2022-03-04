const mongoose = require("mongoose");

mongoose.connect(
  process.env.DB_CONNECTION_URI,
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
