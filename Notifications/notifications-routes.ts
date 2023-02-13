// @ts-ignore
const express = require('express');
const notificationsController = require('./notifications-controller')

// @ts-ignore
const router = express.Router();

//CREATING ROUTES FOR NOTIFICATIONS
router.get('/Notifications/All', notificationsController.getNotifications);
router.post('/Admin/Control-panel/Notifications/Add', notificationsController.createNotification);      //ROUTE FOR POSTING ACTIVITY
router.patch('/Admin/Control-panel/Notifications/Edit/:pid', notificationsController.updateNotification);
router.delete('/Admin/Control-panel/Notifications/Delete/:pid', notificationsController.deleteNotification);

module.exports = router;