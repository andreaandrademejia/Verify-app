const bcrypt = require('bcrypt');

const hash = async (req, res, next) => {
	const { password } = req.body;

	const hash = await bcrypt.hash(password, 10);
	req.passwordHash = hash;

	next();
};

module.exports = hash;
