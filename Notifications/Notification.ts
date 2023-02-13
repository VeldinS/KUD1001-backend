// @ts-ignore
const mongoose = require('mongoose');

// @ts-ignore
const Schema = mongoose.Schema;

//CREATING SCHEMA FOR 'NOTIFICATION'
// @ts-ignore
const notificationSchema = new Schema({
    name: { type: String, required: true },
    text: { type: String, required: false}
});

module.exports = mongoose.model('Notification', notificationSchema);