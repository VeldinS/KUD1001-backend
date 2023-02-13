// @ts-ignore
const express = require('express');
const adminController = require('./admin-controller')

// @ts-ignore
const router = express.Router();

//CREATING ROUTE FOR ADMIN LOGIN
router.post('/Login', adminController.login);

module.exports = router;