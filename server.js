const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;
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