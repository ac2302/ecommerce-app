require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");

const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");

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
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// routes
app.use("/register", registerRoute);
app.use("/login", loginRoute);

const PORT = process.env.PORT || 8085;
app.listen(PORT, () => console.log("listening on port " + PORT));
