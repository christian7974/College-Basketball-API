const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("Welcome to my College Basketball API");
});

app.listen(3000, () => {
    console.log("The server is running on port 3000!");
});