const router = require("express").Router();
const { genToken, readToken } = require("../utils/token");

router.post("/", async (req, res) => {
	const token = req.body.token;

	if (!token) {
		res.status(400).json({ message: "mising token in body" });
		return;
	}

	try {
		const data = readToken(token);
		res.json({
			isValid: true,
			newToken: genToken(data),
			data,
		});
	} catch (err) {
		res.status(400).json({ message: "expired or invalid token" });
	}
});

module.exports = router;
