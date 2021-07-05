const mongoose = require('mongoose')

// Google UserSchema
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

// Create the model with the schema defined 
module.exports = mongoose.model('User', UserSchema)