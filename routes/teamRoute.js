const express = require('express');

const Team = require('../models/teamModel');

const router = express.Router();

const createTeam = require('../controllers/teamController');

// Add Team
router.post('/', createTeam);

module.exports = router;