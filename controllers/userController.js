//TODO: get all users
//done
//TODO: get a single user by id with its populated thoughts and friend data
//done
//TODO: Post/create a new user
//done?
//TODO: put/update user by id
//done
//TODO: delete a user by its id
//TODO: add a new friend to user's friend list
//TODO: delete to remove a friend from a user's friend list

const {User} = require('../models');

module.exports = {
    //get all users
    async getAllUsers(req, res) {
       try {
        const users = await User.find();
        res.status(200).json(users)
       } catch (error) {
        res.status(500).json(error)
       }
    },
    //get a single user and their thoughts/friends populated data
    async getOneUser(req, res) {
        try {
          const singleUser = await User.findOne({_id: req.params.userId})
            .select('- _v')
            .populate('thoughts')
            .populate('friends')
            if(!singleUser) {
                res.status(404).json({message: 'No user with this id'})
            } else {
                res.json(singleUser)
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //create a new user
    async newUser(req, res) {
        try {
            const newUser = await User.create(req.body)
            res.status(200).json(newUser)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //update user by id
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate({_id: req.params.userId}, {$set: req.body}, {new: true})
            if(!updatedUser) {
                res.status(404).json({message: 'No user with this id!'})
            } else {
                res.status(200).json(updatedUser)
            }
        } catch (error) {
            res.status(500).json({message: 'Oops! Something went wrong'})
        }
    },
    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findOneAndRemove({_id: req.params.userId})
            if(!deletedUser) {
                res.status(404).json({message: 'No user with this id!'})
            } else {
                res.status(200).json(deletedUser)
            }
        } catch (error) {
            res.status(500).json({message: 'Oops! Something went wrong'})
        }
    }
}