const express = require('express');

const Team = require('../models/teamModel');

const router = express.Router();

const {createTeam, showAllTeams, findTeamByName, sortTeams, getExtreme, compareTwoTeams} = require('../controllers/teamController');

// Add Team
router.post('/', createTeam);

// Find all teams
router.get('/all', showAllTeams);

// Find a team by their name
router.get('/:teamName', findTeamByName);

// Sort the teams by a statistic
router.get('/sort/:stat/:order', sortTeams);

// Get the team with the most/least of a statistic
router.get('/extreme/:stat/:whichExtreme', getExtreme);

// Compare the stats of two teams
router.get('/compare/:team1/:team2', compareTwoTeams);

module.exports = router;