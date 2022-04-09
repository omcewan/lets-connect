const { Thought, User } = require('../models');

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({ path: 'thought', path: 'friend' })
      .select('-__v')
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },

  // get a single user
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .select('-__v')
      .then((singleUserData) => {
        if (!singleUserData) {
          res.status(400).json({ message: 'No User found with this ID!' });
          return;
        }
        res.json(singleUserData);
      })
      .catch((err) => res.status(500).json(err));
  },

  createUser({ body }, res) {
    User.create(body)
      .then((newUserData) => res.json(newUserData))
      .catch((err) => res.status(500).json(err));
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((updatedUserData) => {
        if (!updatedUserData) {
          res.status(400).json({ message: 'No User found with this ID!' });
          return;
        }
        res.json(updatedUserData);
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((deletedUserData) => {
        if (!deletedUserData) {
          res.status(400).json({ message: 'No User found with this ID!' });
          return;
        }
        res.json(deletedUserData);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;
