const router = require("express").Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
	res.json({ hello: "there" });
});

module.exports = router;
