const mongoose = require('mongoose')

// Twitter UserSchema
const UserSchemaT = new mongoose.Schema({
    twitterId: {
        type: String,
        required: true,
    },
    displayName : {
        type: String,
        required: true,
    },
     createdAT: {
        type: Date,
        default: Date.now,
    }
})

// Create the model with the schema defined 
module.exports = mongoose.model('UserT', UserSchemaT)