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
// If the team name has a space, then type the name with underscores (i.e. Oral_Roberts for Oral Roberts)
const findTeamByName = asyncHandler(async(req, res) => {
    try {
        var {teamName} = req.params;
        const teamNameNoUnderscores = teamName.replace(/_/g, " "); // Remove the underscore from the team name
        const properTeamName = titleCase(teamNameNoUnderscores); // Put the team name in Title Case (oral roberts vs Oral Roberts)
        const theTeam = await Team.find({"name": properTeamName});
        res.status(200).json(theTeam);
    } catch (error) {
        res.status(500);
    }
});
// [statToSortBy] 1 is ascending, -1 is descending
const sortTeams = asyncHandler(async(req, res) => {
    try {
        const statToSortBy = req.params['stat'];
        const order = req.params['order'].toString();

        var valToSort = 0;
        if (order == "asc") {
            valToSort = 1;
        } else if (order == "des"){
            valToSort = -1;
        } else {
            res.status(404);
            res.end();
        }
        const sortedJSON = await (Team.find().sort({[statToSortBy]: valToSort}));
        res.status(200).json(sortedJSON);
    } catch (error) {
        res.status(500);
    }
});

// Get the team that has the most/least of a statistic
// 1 -> is the least
// -1 -> is the most
const getExtreme = asyncHandler(async(req, res) => {
    try {
        const statToGetExtremeOf = req.params['stat'];
        const whichExtreme = req.params['whichExtreme'].toString();
        var valToSort = 0;

        if (whichExtreme == "least") {
            valToSort = 1;
        } else if (whichExtreme == "most"){
            valToSort = -1;
        } else {
            res.status(404);
            res.end();
        }

        const theTeam = await (Team.find({}).sort({[statToGetExtremeOf] : valToSort}).limit(1));
        res.status(200).json(theTeam);
    } catch (error) {
        res.status(500);
    }
});

module.exports = {createTeam, showAllTeams, findTeamByName, sortTeams, getExtreme};