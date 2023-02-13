// @ts-ignore
const mongoose = require('mongoose');

// @ts-ignore
const Schema = mongoose.Schema;

//CREATING SCHEMA FOR 'ACTIVITY'
const activitySchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    country: { type: String, required: true },
    date: { type: String, required: true },
    text: { type: String, required: true },
    image1: {
        type: String,
        required: true,
    },
    image2: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Activity', activitySchema);