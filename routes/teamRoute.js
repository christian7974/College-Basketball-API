const express = require('express');

const Team = require('../models/teamModel');

const router = express.Router();

const {createTeam, showAllTeams, findTeamByName, sortTeams} = require('../controllers/teamController');

// Add Team
router.post('/', createTeam);

// Find all teams
router.get('/all', showAllTeams);

// Find a team by their name
router.get('/:teamName', findTeamByName);

// Sort the teams by a statistic
router.get('/sort/:stat/:order', sortTeams);

module.exports = router;