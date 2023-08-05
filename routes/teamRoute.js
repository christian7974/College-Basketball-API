const express = require('express');

const Team = require('../models/teamModel');

const router = express.Router();

const {createTeam, showAllTeams, findTeamByName} = require('../controllers/teamController');

// Add Team
router.post('/', createTeam);

router.get('/all', showAllTeams);

router.get('/:teamName', findTeamByName);

module.exports = router;