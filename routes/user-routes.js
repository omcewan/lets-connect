const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  addFreind,
  updateUser,
  deleteUser,
  deleteFriend,
} = require('../controllers/user-controller');

router.route('/users').get(getAllUsers).post(createUser);

router.route('/users/:id').get(getUserById).put(updateUser).delete(deleteUser);

router
  .route('/users/:userId/friends/:friendsId')
  .put(addFreind)
  .delete(deleteFriend);

module.exports = router;
