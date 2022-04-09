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
      .populate({ path: 'reactions' })
      .select('-__v')
      .then((newThoughtData) => {
        res.json(newThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = thoughtController;
