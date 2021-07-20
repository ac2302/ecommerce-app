require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");

const app = express();

// connecting to db
mongoose.connect(
	process.env.DB_STRING,
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
	(err) => {
		if (err) console.error(err);
		else console.log("connected to db");
	}
);

// middlewares
app.use(express.json());
app.use(helmet());

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("server live on port " + PORT));
