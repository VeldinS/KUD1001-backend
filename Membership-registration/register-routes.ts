// @ts-ignore
const express = require('express');
const registerController = require('./register-controller');

// @ts-ignore
const router = express.Router();

//CREATING ROUTES FOR MEMBERSHIPS
router.post('/Register', registerController.signup);
router.get('/Admin/Control-panel/Memberships', registerController.getMembers);
router.delete('/Admin/Control-panel/Membership/Delete/:pid', registerController.approveMember);

module.exports = router;