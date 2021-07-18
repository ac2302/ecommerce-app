const router = require("express").Router();
const User = require("../models/User");
const { readToken } = require("../utils/token");

router.get("/:id", async (req, res) => {
	// this route expects the auth-token to be in the header
	const token = req.headers["auth-token"];

	if (!token) {
		res.status(400).json({ message: "missing auth-token in header" });
		return;
	}

	try {
		const user = await User.findById(readToken(token).id);

		if (!user) {
			res.status(401).json({ message: "invalid auth" });
			return;
		}

		if (!user.isAdmin) {
			res
				.status(403)
				.json({ message: "you must be an admin to perform this request" });
			return;
		}

		const requestedUser = await User.findById(req.params.id);

		res.json({ requestedUser });
	} catch (err) {
		res.status(500).json({ err });
	}
});

module.exports = router;
