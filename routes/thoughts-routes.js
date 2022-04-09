const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
} = require('../controllers/thought-controller');

router.route('/thoughts').get(getAllThoughts).post(createThought);

router.route('/thoughts/:id').get(getThoughtById);

module.exports = router;
