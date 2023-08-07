const { User, Thought, Reaction } = require('../models');

module.exports = {
    // Create a reaction for a thought
    async createReaction(req, res) {
        try {
            const { thoughtId } = req.params;
            const { reactionBody, username } = req.body;

            const thought = await Thought.findById(thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            const reaction = await Reaction.create({ reactionBody, username });
            thought.reactions.push(reaction);
            await thought.save();

            res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a reaction from a thought
    async deleteReaction(req, res) {
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

            res.json({ message: 'Reaction removed from thought!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
