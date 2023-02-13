// @ts-ignore
const mongoose = require('mongoose');
// @ts-ignore
const Schema = mongoose.Schema;

//CREATING SCHEMA FOR 'ADMIN'
// @ts-ignore
const adminSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('Admin', adminSchema);