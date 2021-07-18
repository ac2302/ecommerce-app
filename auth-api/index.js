require("dotenv").config();

const express = require("express");
const helmet = require("helmet");

const app = express();

const PORT = process.env.PORT || 8085;
app.listen(PORT, () => console.log("listening on port " + PORT));
