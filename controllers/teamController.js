const Team = require('../models/teamModel');
const asyncHandler = require('express-async-handler');
// const everyTeam = require('../pretty_print_stats.json');
const everyTeamArray = require('../teams_list');
// Creates a team in the Database (used for initialization)
const arrayOfStats = ["pointsPG", "fieldGoalsMadePG", "fieldGoalsAttPG" ,"FGPercent", "threePointMadePG", "threePointAttPG", "threePointPercent", "freeThrowMadePG",
    "freeThrowAttPG", "freeThrowPercent", "offReboundsPG", "defReboundsPG", "totalReboundsPG", "assistsPG", "stealsPG", "blocksPG", "turnoversPG"];

const statExists = function(inputtedStat) {
    if (!arrayOfStats.includes(inputtedStat)) {
        return false;
    } else {
        return true;
    }
};

const teamExists = function(inputtedTeam) {
    for (var i = 0; i < everyTeamArray.length; i ++) {
        if (inputtedTeam === everyTeamArray[i].name) {
            return true;
        }
    }
    return false;
};

const createTeam = asyncHandler(async(req, res) => {
    try {
        await Team.create(everyTeam); // Add every team into the database
        res.status(200).send("You have inserted all of the teams!");
    } catch (error) {
        res.status(500);
    }
});

// Clears the database
const clearDatabase = asyncHandler(async(req, res) => {
    try {
        await Team.deleteMany({}); // Remove every team from the database
        res.status(200).send("You have deleted all of the teams!");
    } catch (error) {
        res.status(500);
    }
});

// Shows every team and their stats in the database
const showAllTeams = asyncHandler(async(req, res) => {
    try {
        const allTeams = await Team.find({}, {_id: 0, __v: 0});
        getArrayOfTeamNames();
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
        if (!teamExists(properTeamName)) {
            res.status(400);
            res.write(properTeamName + " is not in the database of teams. Please try another team.")
            res.end();
        }
        const theTeam = await Team.find({"name": properTeamName}, {_id: 0, __v: 0});
        res.status(200).json(theTeam[0]); // The [0] is so the client has a single JSON instead of an array with only one JSON in it
    } catch (error) {
        res.status(500);
    }
});
// [statToSortBy] 1 is ascending, -1 is descending
const sortTeams = asyncHandler(async(req, res) => {
    try {
        const statToSortBy = req.params['stat'];
        const order = req.params['order'].toString();
        if (!statExists(statToSortBy)) {
            res.status(400).json({error: statToSortBy + " is not a valid statistic to sort by. Please use another statistic."});
            res.end();
        }
        var valToSort = 0;
        if (order == "asc") {
            valToSort = 1;
        } else if (order == "des"){
            valToSort = -1;
        } else {
            res.status(400).json({error: order + " is not a valid parameter. Please use either asc or des."});
            res.end();
        }
        const sortedJSON = await (Team.find({}, {_id: 0, __v: 0}).sort({[statToSortBy]: valToSort}));
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
        if (!statExists(statToGetExtremeOf)) {
            res.status(400).json({error: statToGetExtremeOf + " is not a valid statistic. Please refer to documentation to find a proper statistic."});
            res.end();
        };
        const whichExtreme = req.params['whichExtreme'].toString();
        var valToSort = 0;

        if (whichExtreme == "least") {
            valToSort = 1;
        } else if (whichExtreme == "most"){
            valToSort = -1;
        } else {
            res.status(400).json({error: whichExtreme + " is not a valid extreme. Please use either most for the highest or least for the lowest."});
            res.end();
        }

        const theTeam = await (Team.find({}, {_id: 0, __v: 0}).sort({[statToGetExtremeOf] : valToSort}).limit(1));
        res.status(200).json(theTeam[0]); // The [0] is so this sends a single JSON instead of an array containing one JSON
    } catch (error) {
        res.status(500);
    }
});

// Function to return an array of JSONs of two teams that the client wants to fetch
const compareTwoTeams = asyncHandler(async(req, res) => {
    try {
        var teamOneName = req.params['team1'];
        var teamTwoName = req.params['team2'];
        const teamOneNameNoUnderscores = teamOneName.replace(/_/g, " ");
        const properTeamOneName = titleCase(teamOneNameNoUnderscores);
        const teamTwoNameNoUnderscores = teamTwoName.replace(/_/g, " ");
        const properTeamTwoName = titleCase(teamTwoNameNoUnderscores);
        if (!teamExists(properTeamOneName) && !teamExists(properTeamTwoName)) {
            res.status(400).json({error: properTeamOneName + " and " + properTeamTwoName + " are not in the database of teams. Please use two different teams."});
            res.end();
        } else if (!teamExists(properTeamOneName)) {
            res.status(400).json({error: properTeamOneName + " is not in the database of teams. Please try another team."});
            res.end();
        } else if (!teamExists(properTeamTwoName)) {
            res.status(400).json({error: properTeamTwoName + " is not in the database of teams. Please try another team."});
            res.end();
        };
        const bothTeams = await Team.find({
            "name": {
                $in : [
                    properTeamOneName,
                    properTeamTwoName
                ]
            }
        }, {_id: 0, __v: 0});
        res.status(200).json(bothTeams);
    } catch (error) {
        res.status(500);
    }
});

module.exports = {createTeam, showAllTeams, findTeamByName, sortTeams, getExtreme, compareTwoTeams, clearDatabase};