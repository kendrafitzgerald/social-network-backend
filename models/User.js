const {Schema, model} = require('mongoose');
//user schema
const userSchema = new Schema(
    {
        username: {
            type: String, 
            unique: true, 
            required: true, 
            trim: true 
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
         },
         thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
         ],
         friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
         ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    },
);
//gets number of friends and adds them to user schema
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
//creates user model from user schema
const User = model('user', userSchema);

module.exports = User;