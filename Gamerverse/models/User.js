const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },

    createdAT: {
        type: Date,
        default: Date.now,
    }
})

const UserSchemaT = new mongoose.Schema({
    twitterId: {
        type: String,
        required: true,
    },
    displayName : {
        type: String,
        required: true,
    }
})


module.exports = mongoose.model('User', UserSchema)
module.exports = mongoose.model('UserT', UserSchemaT)