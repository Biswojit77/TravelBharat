const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    capital: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    famousFor: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('State', stateSchema);