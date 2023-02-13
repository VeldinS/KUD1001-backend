// @ts-ignore
const express = require('express');
const activitiesController = require('./activities-controller')

// @ts-ignore
const router = express.Router();

//CREATING ROUTES FOR ACTIVITIES
router.get('/Activities/All', activitiesController.getActivities);
router.get('/Activities/:pid', activitiesController.getActivityById);
router.get('/Admin/Control-panel/Activities/:pid', activitiesController.getActivityById);
router.post('/Admin/Control-panel/Activities/Add', activitiesController.createActivity);
router.patch('/Admin/Control-panel/Activities/Edit/:pid', activitiesController.updateActivity);
router.delete('/Admin/Control-panel/Activities/Delete/:pid', activitiesController.deleteActivity);

module.exports = router;