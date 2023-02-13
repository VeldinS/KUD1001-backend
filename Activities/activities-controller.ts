import mongoose from 'mongoose';
const HttpError = require('../Custom-Error/http-error')
const path = require('path');
const fs = require('fs');
const Activity = require('./Activity')

//GETTING ALL ACTIVITIES FROM DATABASE
const getActivities = async (req: any, res: { json: (arg0: any) => void; }, next: (arg0: any) => any) => {
    let activities;
    try {
        activities = await Activity.find().sort({ createdAt: -1 });
    }catch(err){
        const error = new HttpError('Fetching activities failed, please try again later.');
        return next(error);
    }
    res.json(activities.map((activity: { toObject: (arg0: { getters: boolean; }) => any; }) => activity.toObject({ getters: true })));
}

//GETTING SPECIFIC ACTIVITY BY ITS UNIQUE ID FROM DATABASE
const getActivityById = async (req: { params: { pid: any; }; }, res: { json: (arg0: any) => void; }, next: (arg0: any) => any) => {
    const activityId = req.params.pid;
    let specificActivity;
    try {
        specificActivity = await Activity.findById(activityId);
    }catch (err){
        const error = new HttpError('Something went wrong, could not find an activity.');
        return next(error);
    }
    //IF ACTIVITY IS NOT FOUND
    if(!specificActivity) {
        const error = new HttpError('Could not find an activity for the provided id.');
        return next(error);
    }
    res.json(specificActivity.toObject({getters: true}) );
};

//CREATING NEW ACTIVITY AND SENDING IT TO THE DATABASE
const createActivity = async (req: { body: { name: any; location: any; country: any; date: any; text: any; image1: any; image2: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; createdPost: any; }): void; new(): any; }; }; }, next: (arg0: any) => any) => {
    const { name, location, country, date, text, image1, image2 } = req.body;
    let pathImage1 = path.join(__dirname, 'uploads');   //FOR SAVING IMAGES LOCALLY AND THEIR PATH TO DATABASE
    pathImage1 += `\\${image1}`;
    let pathImage2 = path.join(__dirname, 'uploads');
    pathImage2 += `\\${image2}`;

    // CREATING NEW ACTIVITY
    const createdActivity = await new Activity({
        name: name,
        location: location,
        country: country,
        date: date,
        text: text,
        image1: pathImage1,
        image2: pathImage2
    });

    // SAVING CREATED ACTIVITY TO DATABASE
    try {
        createdActivity.save();
        res.status(201).json({ message: "new activity uploaded", createdPost: createdActivity });
    } catch (err) {
        const error = new HttpError('Creating activity failed, please try again.');
        return next(error);
    }
};

//UPDATING EXISTING ACTIVITY IN THE DATABASE
const updateActivity = async (req: { body: { name: any; location: any; country: any; date: any; text: any; }; params: { pid: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { place: any; }): void; new(): any; }; }; }, next: (arg0: any) => any) => {
    //GETTING THE NEW DATA FOR SOME ACTIVITY IN DATABASE
    const { name, location, country, date, text } = req.body;
    const activityId = req.params.pid;
    let activity;
    try{
        activity = await Activity.findById(activityId); //FINDING DESIRED PLACE
    }catch (err){
        const error = new HttpError('Something went wrong, could not update activity.');
        return next(error);
    }

    //UPDATING THE DATA
    activity.name = name;
    activity.location = location;
    activity.country = country;
    activity.date = date;
    activity.text = text;

    //UPDATING ACTIVITY DATA WITH NEW INFORMATION IN THE DATABASE
    try{
        await activity.save();
    }catch (err){
        const error = new HttpError('Something went wrong, could not update activity.');
        return next(error);
    }
    res.status(200).json({ place:  activity.toObject({getters: true}) })
};

//DELETING ACTIVITY FROM THE DATABASE
const deleteActivity = async (req: { params: { pid: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }, next: (arg0: any) => any) => {
    const activityId = req.params.pid;
    let activity;
    try{
        activity = await Activity.findById(activityId);
    }catch (err){
        const error = new HttpError('Something went wrong, could not delete activity.');
        return next(error);
    }
    if(!activity){
        const error = new HttpError('Could not find a activity for this ID.');
        return next(error);
    }

    //DELETING SPECIFIED ACTIVITY FROM DATABASE
    try{
        await activity.remove();
    }catch(err){
        const error = new HttpError('Something went wrong, could not delete activity.');
        return next(error);
    }
    res.status(200).json({message: 'Deleted activity.'})
}

exports.getActivities = getActivities;
exports.getActivityById = getActivityById;
exports.createActivity = createActivity;
exports.updateActivity = updateActivity;
exports.deleteActivity = deleteActivity;

