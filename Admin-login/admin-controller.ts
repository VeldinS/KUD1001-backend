import mongoose from 'mongoose';
const HttpError = require('../Custom-Error/http-error')
const Admin = require('./Admin')

//CREATING LOGIN FOR ACCESSING ADMIN AND CONTROL PANEL ROUTES
const login = async (req: { body: { username: any; password: any; }; }, res: { json: (arg0: { message: string; user: any; }) => void; }, next: (arg0: any) => any) => {
    const { username, password} = req.body;
    let existingUser;
    try {
        existingUser = await Admin.findOne({username: username});
    }catch (err){
        const error = new HttpError('Login failed, please try again later.');
        return next(error);
    }
    if(!existingUser || existingUser.password !== password){
        const error = new HttpError('Invalid credentials, could not log you in.');
        return next(error);
    }
    res.json({message: 'Logged in!',user:  existingUser.toObject({getters: true})});
}

exports.login = login;