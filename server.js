require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const teamRoute = require('./routes/teamRoute');
const Team = require('./models/teamModel');

const app = express();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/teams', teamRoute);

app.get('/', (req, res) => {
    res.send("Welcome to my College Basketball API");
});

mongoose
.connect(MONGO_URL)
.then(() => {
    console.log("connected to mongodb");
    app.listen(PORT, () => {
        console.log(`Node API app is running on Port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
});