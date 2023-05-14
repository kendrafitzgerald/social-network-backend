const router = require("express").Router();

const {
  getAllUsers,
  getOneUser,
  newUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

router
  .route("/")
  .get(getAllUsers)
  .post(newUser)
  .put(updateUser)
  .delete(deleteUser)

router.route("/:userId").get(getOneUser);

router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend)

module.exports = router