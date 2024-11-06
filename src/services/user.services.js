const EmailCode = require('../models/EmailCode');
const User = require('../models/User');
const { sendEmail } = require('../utils/sendEmail');
const bcrypt = require('bcrypt');

const getAllServices = async () => {
	return await User.findAll();
};

const createServices = async (user) => {
	return await User.create(user);
};

const getOneServices = async (id) => {
	return await User.findByPk(id);
};

const removeServices = async (id) => {
	return await User.destroy({ where: { id } });
};

const updateServices = async (id, user) => {
	return await User.update(user, { where: { id }, returning: true });
};

const codePasswordServices = async (body) => {
	const { email, frontBaseUrl } = body;
	const user = await User.findOne({ where: { email } });
	if (!user) return res.status(401).json({ error: "That email doesn't exist" });

	const code = require('crypto').randomBytes(64).toString('hex');

	const updateCode = await EmailCode.create({ code, userId: user.id });

	const firstName = user.firstName;

	sendEmail({
		to: email,
		subject: 'Password Update',
		html: `
		<div style="max-width: 500px; margin: 50px auto; background-color: #f8fafc; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: 'Arial', sans-serif; color: #333333;">
		  
		  <h1 style="color: #007BFF; font-size: 28px; text-align: center; margin-bottom: 20px;">¡Hola ${firstName.toUpperCase()} 👋!</h1>    
		  
		  <p style="font-size: 18px; line-height: 1.6; margin-bottom: 25px; text-align: center;"> Para actualizar su contraseña, haga clic en el siguiente enlace:</p>
		  
		  <div style="text-align: center;">
			  <a href="${frontBaseUrl}/reset_password/${code}" style="display: inline-block; background-color: #007BFF; color: #ffffff; text-align: center; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 18px;">¡Actualizar Contraseña!</a>
		  </div>
		</div>`,
	});
};

const resetPasswordServices = async (code, password) => {
	const result = await EmailCode.findOne({ where: { code } });
	if (!result) return res.status(401).json({ error: 'Code expired' });

	const user = await User.findByPk(result.userId);

	const passwordUpdated = await bcrypt.hash(password, 10);

	const userNewPassword = await user.update({ password: passwordUpdated });

	await result.destroy();

	return userNewPassword;
};

module.exports = { getAllServices, createServices, getOneServices, removeServices, updateServices, codePasswordServices, resetPasswordServices };
