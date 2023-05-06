const express = require("express");
const app = express();
const port = 3000;
const { sql } = require("slonik");
const nodemailer = require("./controllers/nodemailer");

const db = require("./config/db");
const router = require("./routes/auth");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
