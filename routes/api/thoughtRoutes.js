const router = require("express").Router();
//require all controllers
const {
  getAllThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  newReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");
//all routes that live at /thoughts
router
  .route("/")
  .get(getAllThoughts)
  .post(createThought)
  .put(updateThought)
  .delete(deleteThought);
//rought to get a single thought
router.route("/:thoughtId").get(getOneThought);
//route to add and remove reactions
router.route("/:thoughtId/reactions").post(newReaction).delete(deleteReaction);

module.exports = router;
