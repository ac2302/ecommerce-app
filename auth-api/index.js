require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");

const app = express();

// connecting to db
mongoose.connect(process.env.DB_STRING, (err) => {
	if (err) console.error(err);
	else console.log("connected to db");
});

// middlewares
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

const PORT = process.env.PORT || 8085;
app.listen(PORT, () => console.log("listening on port " + PORT));
