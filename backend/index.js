const express = require("express");
const app = express();

const configs = require("./configs");

const { PORT, HOST } = configs;
configs.APP_PATH = __dirname;

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

app.listen(PORT, HOST, () => {
  console.log("Server is running at " + PORT);
});
