const { User, Thought, Reaction } = require('../models');

module.exports = {
    // Get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find().populate('reactions');
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get a single thought by ID
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId).populate('reactions');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a new thought
    async createThought(req, res) {
        try {
            const { thoughtText, username } = req.body;

            const user = await User.findOne({ username });
            if (!user) {
                return res.status(404).json({ message: 'No user with that username' });
            }

            const thought = await Thought.create({ thoughtText, username });
            user.thoughts.push(thought._id);
            await user.save();

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update a thought by ID
    async updateThought(req, res) {
        try {
            const { thoughtId } = req.params;
            const { thoughtText } = req.body;

            const updatedThought = await Thought.findByIdAndUpdate(thoughtId, { thoughtText }, { new: true });

            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a thought by ID and remove its references from the user's thoughts and reactions
    async deleteThought(req, res) {
        try {
            const { thoughtId } = req.params;

            const deletedThought = await Thought.findByIdAndDelete(thoughtId);

            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            await User.updateMany({}, { $pull: { thoughts: thoughtId } });

            await Reaction.deleteMany({ thoughtId });

            res.json({ message: 'Thought and associated data deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Add a reaction to a thought
    async addReaction(req, res) {
        try {
            const { thoughtId } = req.params;
            const { reactionBody, username } = req.body;

            const thought = await Thought.findById(thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            const reaction = { reactionBody, username };
            thought.reactions.push(reaction);
            await thought.save();

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Remove a reaction from a thought
    async removeReaction(req, res) {
        try {
            const { thoughtId, reactionId } = req.params;

            const thought = await Thought.findById(thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            const reactionIndex = thought.reactions.findIndex(
                (reaction) => reaction._id.toString() === reactionId
            );

            if (reactionIndex === -1) {
                return res.status(404).json({ message: 'No reaction with that ID' });
            }

            thought.reactions.splice(reactionIndex, 1);
            await thought.save();

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
