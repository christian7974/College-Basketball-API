require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const teamRoute = require('./routes/teamRoute');
const Team = require('./models/teamModel');

const app = express();

const NODE_ENV = process.env.NODE_ENV;
const MONGO_URL = process.env.MONGO_URL;
const DEV_URL = process.env.DEV_URL;
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/teams', teamRoute);

app.get('/', (req, res) => {
    res.send("Welcome to my College Basketball API");
});

// Conditional to toggle the ability to write to the database (only I can do this)
var currentMONGO_URL = "";
// either development or production
if (NODE_ENV == "development") {
    currentMONGO_URL = MONGO_URL;
} else {
    currentMONGO_URL = DEV_URL;
}

mongoose
.connect(currentMONGO_URL)
.then(() => {
    console.log("connected to mongodb");
    app.listen(PORT, () => {
        console.log(`Node API app is running on Port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
});