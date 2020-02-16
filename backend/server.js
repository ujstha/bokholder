const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const books = require("./routes/books");
const db_connect = require("./config/db_config");

const port = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

db_connect();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/books", books);

app.listen(port, () => {
  console.log(`App is being served on port : ${port}`);
});
