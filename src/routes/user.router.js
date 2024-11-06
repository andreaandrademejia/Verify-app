const {
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
} = require('../controllers/user.controllers');

const express = require('express');
const hash = require('../middlewares/hash.middlewares');
const credentials = require('../middlewares/login.middlewares');
const sessionJWT = require('../middlewares/sessionJWT.middlewares');
const { verifyJWT } = require('../utils/verifyJWT');
const emailCode = require('../middlewares/emailCode.middleware');

const routerUser = express.Router();

//rutas estaticas
routerUser.route('/').get(verifyJWT, getAll).post(hash, create, emailCode);
routerUser.route('/login').post(credentials, sessionJWT, login);
routerUser.route('/me').get(verifyJWT, logged);
routerUser.route('/reset_password').post(codePassword);

//rutas estaticas-dinamicas
routerUser.route('/verify/:code').get(userVerified);
routerUser.route('/reset_password/:code').post(resetPassword);

//rutas dinamicas
routerUser.route('/:id').get(verifyJWT, getOne).delete(verifyJWT, remove).put(verifyJWT, update);

module.exports = routerUser;
