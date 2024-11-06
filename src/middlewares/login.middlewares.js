const bcrypt = require('bcrypt');
const User = require('../models/User');

const credentials = async (req, res, next) => {
	const { email, password } = req.body;

	const user = await User.findOne({ where: { email } });
	if (!user) return res.status(401).json({ error: 'invalid credentials' });

	const isValid = await bcrypt.compare(password, user.password);

	if (!isValid) return res.status(401).json({ error: 'invalid credentials' });

	if (user.isVerified === 'false') return res.status(401).json({ message: 'isVerified:false' });

	req.userLogin = user;

	next();
};

module.exports = credentials;
