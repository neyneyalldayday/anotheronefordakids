const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
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
    reactions: [
      // Array of objects with the structure defined by the reactionSchema
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
    ],
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

// Initialize our Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
