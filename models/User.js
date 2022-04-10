const { Schema, model } = require('mongoose');
const validateEmail = require('../utils/validateEmail');
const Thought = require('./Thought');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      validate: [validateEmail, 'Please enter a valid email'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

UserSchema.pre('remove', async function (next) {
  try {
    await Thought.remove({ _id: { $in: this.thoughts } });
    next();
  } catch (error) {
    next(error);
  }
});

const User = model('User', UserSchema);

module.exports = User;
