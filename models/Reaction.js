const { Schema, model } = require('mongoose');

// Schema to create reaction model
// Should only be used as schema in Thought!
const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => formatDate(timestamp),
    },
    username: {
        type: String,
        required: true,
      },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// Reformats date for timestamp (used for createdAt)
function formatDate(timestamp) {
  return timestamp.toLocaleString();
}

// Initialize our Reaction model
const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;
