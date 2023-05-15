//TODO: get all thoughts
//done
//TODO: get single thought by id
//done
//TODO: create a new thought, push _id to associate user's thought array
//done
//TODO: update a thought by id
//done
//TODO: delete a thought by id
//done
//TODO: create a reaction and store in a single thought's reactions array field
//TODO: delete and remove a reaction by reactionId value



const {Thought, User} = require('../models');


module.exports = {
    //get all thoughts
    async getAllThoughts(req, res) {
        try {
        const thoughts = await Thought.find({});
        res.status(200).json(thoughts)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //get one thought
    async getOneThought(req, res) {
        try {
           const singleThought = await Thought.findOne({_id: req.params.thoughtId});
           if(!singleThought) {
            res.status(404).json({message: 'No thought with this id!'})
           } else {
            res.status(200).json(singleThought)
           }
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //create thought and push it into the thoughts id
    async createThought(req, res) {
        try {
            const newThought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                {_id: req.body.userId},
                {$push: {thoughts: newThought._id}},
                {new: true}
            );
            if(!user) {
                res.status(404).json({message: 'No user found with this id!'})
            } else {
                res.status(200).json({message: 'Thought created'})
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //update thought by id
    async updateThought(req, res) {
        try {
            const updatedThought= await Thought.findOneAndUpdate(
                {_id: req.body.thoughtId},
                {$set: req.body},
                {runValidators: true, new: true}
            );
            if(!updatedThought) {
                res.status(404).json({message: 'No thought with this id!'})
            } else {
                res.status(200).json(updatedThought)
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //delete thought by id
    async deleteThought(req, res) {
        try {
          const deletedThought = await Thought.findOneAndRemove({
            _id: req.body.thoughtId,
          });
          if (!deletedThought) {
            return res.status(404).json({ message: "No thought with this id!" });
          }
          const user = await User.findOneAndUpdate(
            {thoughts: req.body.thoughtId},
            {$pull: {thoughts: req.body.thoughtId}},
            {new: true}
          )
          if(!user) {
            res.status(404).json({message: 'No user with this id'})
          } else {
            res.status(200).json({message: 'Thought deleted!'})
          }
          
        } catch (error) {
          res.status(500).json(error);
        }
      },
      async newReaction(req, res) {
        try {
            const newReaction = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {runValidators: true, new: true}
            )
            if(!newReaction) {
                res.status(404).json({message: 'Oops! Something went wrong.'})
            } else {
                res.status(200).json(newReaction)
            }
        } catch (error) {
            res.status(500).json(error)
        }
      },
      async deleteReaction(req, res) {
        try {
            const deleteReaction = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: {reactionId: req.params.reactionId}}},
                {runValidators: true, new: true}
            );
            if(!deleteReaction) {
                res.status(404).json({message: 'Oops! Something went wrong'})
            } else {
                res.status(200).json(deleteReaction)
            }
        } catch (error) {
            res.status(500).json(error)
        }
      }
     
};