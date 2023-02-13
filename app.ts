const express = require('express');
const mongoose = require('mongoose')
let bodyParser = require("body-parser");
import cors from "cors";

//IMPORTS FOR ROUTES
const registerRoutes = require('./Membership-registration/register-routes')
const adminRoutes = require('./Admin-login/admin-routes')
const activitiesRoutes = require('./Activities/activities-routes')
const notificationsRoutes = require('./Notifications/notifications-routes')

const app = express();

//HANDLING 'CORS' ERROR
app.use((req: any, res: { setHeader: (arg0: string, arg1: string) => void; }, next: () => void)=>{     //FOR CORS ERROR IN BROWSER WHEN SENDING DATA
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
})

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', registerRoutes); // route to MEMBERSHIPS
app.use('/', adminRoutes); // route to ADMIN LOGIN
app.use('/', activitiesRoutes); // route to ACTIVITIES
app.use('/', notificationsRoutes); // route to NOTIFICATIONS

//CONNECTING TO DATABASE
mongoose
    .connect('mongodb+srv://veldin:V3ldin123@cluster0.kai58d9.mongodb.net/KUD?retryWrites=true&w=majority')
    .then(() => {
        app.listen(5000);
        console.log('Connected to database')
    })
    .catch((err: any) => {
        console.log(err);
    });

