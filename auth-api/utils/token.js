const jwt = require("jsonwebtoken");

// expiry time in seconds
const expiresIn = 60 * 60 * 24 * 3;
const forever = 60 * 60 * 24 * 30 * 12 * 10;

const SECRET = process.env.JWT_SECRET;

module.exports = {
	genToken: (data, isForever) => {
		return jwt.sign(
			{
				exp: Math.floor(Date.now() / 1000) + (isForever ? forever : expiresIn),
				data,
			},
			SECRET
		);
	},

	readToken: (token) => {
		return jwt.verify(token, SECRET).data;
	},
};
