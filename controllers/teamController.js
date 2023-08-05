const Team = require('../models/teamModel');
const asyncHandler = require('express-async-handler');

// Creates a team in the Database (used for initialization)
const createTeam = asyncHandler(async(req, res) => {
    try {
        const individualTeam = await Team.create(req.body);
        res.status(200).json(individualTeam);
    } catch (error) {
        res.status(500);
    }
});

// Shows every team and their stats in the database
const showAllTeams = asyncHandler(async(req, res) => {
    try {
        const allTeams = await Team.find({});
        res.status(200).json(allTeams);
    } catch (error) {
        res.status(500);
    }
});
// Function that turns a string into titlecasse (that is how the team names are stored in the database)
function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    return str.join(' ');
  }

// Function that can find a team by the name passed in as a parameter
const findTeamByName = asyncHandler(async(req, res) => {
    try {
        const {teamName} = req.params;
        const properTeamName = titleCase(teamName);
        console.log(properTeamName);
        const theTeam = await Team.find({"name": properTeamName});
        res.status(200).json(theTeam);
    } catch (error) {
        res.status(500);
    }
});

module.exports = {createTeam, showAllTeams, findTeamByName};