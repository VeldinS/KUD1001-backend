import mongoose from 'mongoose';
const HttpError = require('../Custom-Error/http-error')
const Notification = require('./Notification')

//GETTING ALL NOTIFICATIONS FROM THE DATABASE
const getNotifications = async (req: any, res: { json: (arg0: any) => void; }, next: (arg0: any) => any) => {
    let notifications;
    try {
        notifications = await Notification.find();
    }catch(err){
        const error = new HttpError('Fetching notifications failed, please try again later.');
        return next(error);
    }
    res.json(notifications.map((notification: { toObject: (arg0: { getters: boolean; }) => any; }) => notification.toObject({ getters: true })));
}

//CREATING NEW NOTIFICATION IN THE DATABSE
const createNotification = async (req: { body: { name: any; text: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; createdPost: any; }): void; new(): any; }; }; }, next: (arg0: any) => any) => {
    const { name, text } = req.body;
    // NEW NOTIFICATION
    const createdNotification = await new Notification({
        name: name,
        text: text
    });
    // SAVING CREATED NOTIFICATION TO THE DATABASE
    try {
        createdNotification.save();
        res.status(201).json({ message: "New notification uploaded", createdPost: createdNotification });
    } catch (err) {
        const error = new HttpError('Creating notification failed, please try again.');
        return next(error);
    }
};

//UPDATING EXISTING NOTIFICATION IN THE DATABASE
const updateNotification = async (req: { body: { name: any; text: any; }; params: { pid: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { notification: any; }): void; new(): any; }; }; }, next: (arg0: any) => any) => {
    //GETTING NEW DATA FOR THE SPECIFIC NOTIFICATION
    const { name, text } = req.body;
    const notificationId = req.params.pid;
    let notification;
    try{
        notification = await Notification.findById(notificationId);
    }catch (err){
        const error = new HttpError('Something went wrong, could not update notification.');
        return next(error);
    }
    //UPDATING DATA OF THE SPECIFIED NOTIFICATION
    notification.name = name;
    notification.text = text;
    //UPDATING OUR NOTIFICATION WITH NEW INFORMATION IN THE DATABASE
    try{
        await notification.save();
    }catch (err){
        const error = new HttpError('Something went wrong, could not update notification.');
        return next(error);
    }
    res.status(200).json({ notification:  notification.toObject({getters: true}) })
};

//DELETING SPECIFIED NOTIFICATION FROM THE DATABASE
const deleteNotification = async (req: { params: { pid: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }, next: (arg0: any) => any) => {
    const notificationId = req.params.pid;
    let notification;
    try{
        notification = await Notification.findById(notificationId);
    }catch (err){
        const error = new HttpError('Something went wrong, could not delete notification.');
        return next(error);
    }
    if(!notification){
        const error = new HttpError('Could not find a notification for this ID.');
        return next(error);
    }
    //DELETING NOTIFICATION FROM THE DATABASE
    try{
        await notification.remove();
    }catch(err){
        const error = new HttpError('Something went wrong, could not delete notification.');
        return next(error);
    }
    res.status(200).json({message: 'Deleted notification.'})
}

exports.getNotifications = getNotifications;
exports.createNotification = createNotification;
exports.updateNotification = updateNotification;
exports.deleteNotification = deleteNotification;

