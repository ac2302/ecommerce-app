const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/", async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	if (!firstName || !lastName || !email || !password) {
		// invalid request
		res.status(400).json({
			message: "body must contain firstName, lastName, email and password",
		});
		return;
	}

	try {
		// salting and hashing password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// creating new user and saving to database
		const newUser = await new User({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		});
		await newUser.save();
		res.json({ newUser });
	} catch (err) {
		res.status(500).json({ err });
	}
});

module.exports = router;
