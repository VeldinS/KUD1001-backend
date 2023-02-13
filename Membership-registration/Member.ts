// @ts-ignore
const mongoose = require('mongoose');
// @ts-ignore
const Schema = mongoose.Schema;

//CREATING SCHEMA FOR 'MEMBER'
// @ts-ignore
const memberSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    date: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true },
});

module.exports = mongoose.model('Member', memberSchema);