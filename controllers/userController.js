//TODO: get all users
//done
//TODO: get a single user by id with its populated thoughts and friend data
//done
//TODO: Post/create a new user
//done?
//TODO: put/update user by id
//done
//TODO: delete a user by its id
//done
//TODO: add a new friend to user's friend list
//done?
//TODO: delete to remove a friend from a user's friend list
//done?
const { User, Thought} = require("../models");

module.exports = {
  //get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //get a single user and their thoughts/friends populated data
  async getOneUser(req, res) {
    try {
      const singleUser = await User.findOne({ _id: req.params.userId })
        .select("- _v")
        .populate("thoughts")
        .populate("friends");
      if (!singleUser) {
        res.status(404).json({ message: "No user with this id!" });
      } else {
        res.status(200).json(singleUser);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //create a new user
  async newUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //update user by id
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $set: req.body },
        { new: true }
      );
      if (!updatedUser) {
        res.status(404).json({ message: "No user with this id!" });
      } else {
        res.status(200).json(updatedUser);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //delete user by id and thoughts
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndRemove({
        _id: req.body.userId,
      });
      if (!deletedUser) {
        return res.status(404).json({ message: "No user with this id!" });
      } 
      const thoughts = await Thought.deleteMany({
        username: deletedUser.username
      })
      if(!thoughts) {
        res.status(404).json({message: 'No thoughts found'})
      } else {
        res.status(200).json({message: 'Successfully deleted'})
      }

    } catch (error) {
      res.status(500).json(error);
    }
  },
  //add friend to user?
  async addFriend(req, res) {
    try {
      const newFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendsId } },
        { runValidators: true, new: true }
      );
      if (!newFriend) {
        res.status(404).json({ message: "No user with this id!" });
      } else {
        res.status(200).json(newFriend);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //delete friend from user
  async deleteFriend(req, res) {
    try {
      const deletedFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: { friendsId: req.params.friendsId } } },
        { runValidators: true, new: true }
      );
      if(!deletedFriend) {
        res.status(404).json({message: 'No user with this id!'})
      } else {
        res.status(200).json(deletedFriend)
      }
    } catch (error) {
        res.status(500).json(error)
    }
  },
};
