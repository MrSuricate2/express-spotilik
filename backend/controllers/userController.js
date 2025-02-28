const { User } = require('../models');
const bcrypt = require('bcrypt');

const addUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({
                error: "All fields are required (username, password, email)"
            });
        }


        if (typeof password !== 'string' || password.trim() === '') {
            return res.status(400).json({
                error: "Password cannot be empty"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            password_hash: hashedPassword,
            email
        });

        const userWithoutPassword = {
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        res.status(201).json(userWithoutPassword);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        res.json({ message: `Deleted user ${req.params.id}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// TODO: Implement login logic with authentication and JWT
const loginUser = async (req, res) => {
    res.status(501).json({ message: 'Login functionality not implemented yet' });
};

module.exports = {
    addUser,
    deleteUser,
    loginUser
};
