const catchError = require('../utils/catchError');
const {
	getAllServices,
	createServices,
	getOneServices,
	updateServices,
	removeServices,
	codePasswordServices,
	resetPasswordServices,
} = require('../services/user.services');
const User = require('../models/User');
const EmailCode = require('../models/EmailCode');

const getAll = catchError(async (req, res) => {
	const result = await getAllServices();
	return res.json(result);
});

const create = catchError(async (req, res, next) => {
	const result = await createServices({ ...req.body, password: req.passwordHash });

	req.result = result;
	next();
});

const getOne = catchError(async (req, res) => {
	const { id } = req.params;
	const result = await getOneServices(id);
	if (!result) return res.sendStatus(404);
	return res.json(result);
});

const remove = catchError(async (req, res) => {
	const { id } = req.params;
	const result = await removeServices(id);
	if (!result) return res.sendStatus(404);
	return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
	const { id } = req.params;
	const fieldToDelete = ['password', 'email', 'isVerified'];
	fieldToDelete.forEach((field) => {
		delete req.body[field];
	});
	const result = await updateServices(id, req.body);
	if (result[0] === 0) return res.sendStatus(404);
	return res.json(result[1][0]);
});

const login = async (req, res) => {
	const user = req.userLogin;
	if (!user) return res.status(401).json({ error: 'invalid credentials' });
	const token = req.token;

	return res.json({ user, token });
};

const logged = async (req, res) => {
	const user = req.user;
	return res.json(user);
};
const userVerified = catchError(async (req, res) => {
	const { code } = req.params;

	const result = await EmailCode.findOne({ where: { code } });
	const user = await User.findByPk(result.userId);
	if (!user) return res.sendStatus(404);

	const userUpdate = await user.update({ isVerified: true });
	await result.destroy();

	return res.json(userUpdate);
});

const codePassword = catchError(async (req, res) => {
	await codePasswordServices(req.body);
	return res.status(201).json('Update password email has sent.');
});

const resetPassword = catchError(async (req, res) => {
	const { code } = req.params;
	const { password } = req.body;
	const userUpdated = await resetPasswordServices(code, password);
	return res.json(userUpdated);
});

module.exports = {
	getAll,
	create,
	getOne,
	remove,
	update,
	login,
	logged,
	userVerified,
	codePassword,
	resetPassword,
};
