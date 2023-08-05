const Team = require('../models/teamModel');
const asyncHandler = require('express-async-handler');

const createTeam = asyncHandler(async(req, res) => {
    try {
        const individualTeam = await Team.create(req.body);
        res.status(200).json(individualTeam);
    } catch (error) {
        res.status(500);
    }
});

module.exports = createTeam;