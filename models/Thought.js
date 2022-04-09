const { Schema, model } = require('mongoose');


const ThoughtSchema = new Schema(
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
      // set a getter, make a date utility
    },
    username: {
      type: String,
      ref: 'User',
      required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      // set getters to true.
    },
    id: false,
  }
);

ThoughtSchema.virtual('reactionCount').get(() => {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
