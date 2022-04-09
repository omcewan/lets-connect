const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
} = require('../controllers/thought-controller');

router.route('/thoughts').get(getAllThoughts).post(createThought);

router
  .route('/thoughts/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
