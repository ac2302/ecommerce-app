const jwt = require("jsonwebtoken");

// expiry time in seconds
const expiresIn = 60 * 60 * 24 * 7;

const SECRET = process.env.JWT_SECRET;

module.exports = {
	genToken: (data) => {
		return jwt.sign(
			{
				exp: Math.floor(Date.now() / 1000) + expiresIn,
				data,
			},
			SECRET
		);
	},
};
