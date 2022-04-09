const { Schema, model } = require('mongoose');
const validateEmail = require('../utils/validateEmail');

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
    thought: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friend: [
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
  return this.friend.length;
});

const User = model('User', UserSchema);

module.exports = User;
