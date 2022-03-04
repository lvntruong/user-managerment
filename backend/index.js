const express = require("express");
const app = express();

//config .env file
require("dotenv").config();

const path = require("path");

// app.use('/static', express.static(path.join(__dirname, 'assets')))

// Connect to database
require("./db");

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

const cors = require("cors");
app.use(cors());

// Setting up API

const routes = require("./routes");
app.use("/api", routes);

// Error Handler
app.all("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log("Server is running at " + process.env.PORT);
});
