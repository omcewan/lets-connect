const { Thought, User } = require('../models');

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find()
      .select('-__v')
      .populate({ path: 'reactions', select: '-__v' })
      .then((allThoughtsData) => {
        res.json(allThoughtsData);
      })
      .catch((err) => res.status(400).json(err));
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({ path: 'reactions', select: '-__v' })
      .select('-__v')
      .then((singleThoughtData) => {
        if (!singleThoughtData) {
          res.status(400).json({ message: 'No Thought with this ID!' });
          return;
        }
        res.json(singleThoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },

  createThought({ body }, res) {
    Thought.create(body)
      .then((newThoughtData) => {
        res.json(newThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((updatedThoughData) => {
        if (!updatedThoughData) {
          res.status(400).json({ message: 'No Thought with this ID!' });
          return;
        }
        res.json(updatedThoughData);
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((deletedThoughtData) => {
        if (!deletedThoughtData) {
          res.status(400).json({ message: 'No Thought with this ID!' });
          return;
        }
        res.json(deletedThoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;
