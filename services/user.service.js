// services/userService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.registerUser = async (email, password) => {
    let user = await User.findOne({ email });
    if (user) {
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

exports.loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User does not exist');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

exports.getUserById = async (id) => {
    const user = await User.findById(id).select('-password');
    return user;
};
