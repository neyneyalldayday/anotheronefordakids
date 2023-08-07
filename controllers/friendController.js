const { User, Thought, Reaction } = require('../models');

module.exports = {
    // Add a friend to a user's friend list
    async addFriend(req, res) {
        try {
            const { userId, friendId } = req.params;

            const [user, friend] = await Promise.all([
                User.findById(userId),
                User.findById(friendId),
            ]);

            if (!user || !friend) {
                return res.status(404).json({ message: 'One or both users not found' });
            }

            if (user.friends.includes(friendId)) {
                return res.status(400).json({ message: 'Friend already in friends list' });
            }

            user.friends.push(friendId);
            await user.save();

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Remove a friend from a user's friend list
    async removeFriend(req, res) {
        try {
            const { userId, friendId } = req.params;

            const [user, friend] = await Promise.all([
                User.findById(userId),
                User.findById(friendId),
            ]);

            if (!user || !friend) {
                return res.status(404).json({ message: 'One or both users not found' });
            }

            if (!user.friends.includes(friendId)) {
                return res.status(400).json({ message: 'Friend not found in friends list' });
            }

            user.friends.pull(friendId);
            await user.save();

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
