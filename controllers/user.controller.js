// controllers/userController.js
const userService = require('../services/user.service');

exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userService.registerUser(email, password);
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ msg: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userService.loginUser(email, password);
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ msg: err.message });
    }
};

exports.getUser = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userService.getUserById(decoded.id);
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
