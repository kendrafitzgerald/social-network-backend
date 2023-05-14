const router = require('express').Router()

const {
getAllThoughts, 
getOneThought,
createThought,
updateThought,
deleteThought,
newReaction,
deleteReaction
} = require('../../controllers/thoughtController')

router.route('/')
.get(getAllThoughts)
.post(createThought)
.put(updateThought)
.delete(deleteThought)

router.route('/:thoughtId')
.get(getOneThought)

router.route('/:thoughtId/reactions')
.post(newReaction)
.delete(deleteReaction)

module.exports = router