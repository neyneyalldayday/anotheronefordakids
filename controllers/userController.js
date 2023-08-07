const { User, Thought, Reaction } = require('../models');

module.exports = {
    // Get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find().populate('thoughts').populate('friends');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get a single user by ID
    async getSingleUser(req, res) {
        try {
            const user = await User.findById(req.params.userId)
                .populate('thoughts')
                .populate('friends');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update a user by ID
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.userId,
                req.body,
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a user by ID and associated thoughts and reactions
    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.userId);

            if (!deletedUser) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            await Thought.deleteMany({ username: deletedUser.username });

            await Reaction.deleteMany({ username: deletedUser.username });

            res.json({ message: 'User and associated data deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
