const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { genToken } = require("../utils/token");

router.post("/", async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400).json({ message: "missing email or password" });
		return;
	}

	const user = await User.findOne({ email });

	if (!user) {
		res.json({ message: "incorrect username or password" });
		return;
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		res.json({ message: "incorrect username or password" });
		return;
	}

	// send jwt
	res.json({
		loggedIn: true,
		token: genToken(
			{
				id: user._id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
			},
			user.isAdmin
		),
		isAdmin: user.isAdmin,
	});

	try {
	} catch (err) {
		res.status(500).json({ err });
	}
});

module.exports = router;
