const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  createReaction,
  updateThought,
  deleteThought,
  deleteReaction,
} = require('../controllers/thought-controller');

router.route('/thoughts').get(getAllThoughts).post(createThought);

router
  .route('/thoughts/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.route('/thoughts/:thoughtId/reactions').post(createReaction);

router
  .route('/thoughts/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;
