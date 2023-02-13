import mongoose from 'mongoose';
const HttpError = require('../Custom-Error/http-error')
const Member = require('./Member')

//CREATING SIGNUP FOR NEW MEMBERSHIPS APPLICATION
const signup = async (req: { body: PromiseLike<{ name: any; surname: any; date: any; email: any; number: any; }> | { name: any; surname: any; date: any; email: any; number: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { user: any; }): void; new(): any; }; }; }, next: (arg0: any) => any) => {
    const {name, surname, date, email, number} = await req.body;
    //CREATING NEW MEMBER
    const createdUser = await new Member({
        name,
        surname,
        date,
        email,
        number
    });
    //SENDING NEW USER DATA TO THE DATABASE
    try {
        await createdUser.save();
    }catch(err){
        const error = new HttpError('Signing up failed, please try again.');
        return next(error);
    }
    res.status(201).json({ user: createdUser.toObject({getters: true}) });
}

//GETTING ALL MEMBERS AND MEMBERSHIP APPLICATIONS FROM THE DATABASE
const getMembers = async (req: any, res: { json: (arg0: any) => void; }, next: (arg0: any) => any) => {
    let members;
    try {
        members = await Member.find();
    }catch(err){
        const error = new HttpError('Fetching members failed, please try again later.');
        return next(error);
    }
    res.json(members.map((member: { toObject: (arg0: { getters: boolean; }) => any; }) => member.toObject({ getters: true })));
}

//DELETING MEMBERSHIP APPLICATION FROM THE DATABASE
const approveMember = async (req: { params: { pid: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }, next: (arg0: any) => any) => {
    const memberId = req.params.pid;
    let member;
    try{
        member = await Member.findById(memberId);
    }catch (err){
        const error = new HttpError('Something went wrong, could not delete member.');
        return next(error);
    }
    if(!member){
        const error = new HttpError('Could not find a member for this ID.');
        return next(error);
    }
    //DELETING OUR MEMBER FROM DATABASE
    try{
        await member.remove();
    }catch(err){
        const error = new HttpError('Something went wrong, could not delete member.');
        return next(error);
    }
    res.status(200).json({message: 'Deleted member.'})
}

exports.approveMember = approveMember;
exports.getMembers = getMembers;
exports.signup = signup;
