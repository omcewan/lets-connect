const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user-controller');

router.route('/users').get(getAllUsers).post(createUser);

router.route('/users/:id').get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
