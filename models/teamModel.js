const mongoose = require('mongoose');

// This is the backend schema for an individual team

const teamSchema = mongoose.Schema({
    // team name
    name: {
        type: String,
        required: [true, "Every team must have a name"]
    },
    // points per game
    pointsPG: {
        type: Number
    },
    // field goals made per game
    fieldGoalsMadePG: {
        type: Number
    },
    // field goal attempts per game
    fieldGoalsAttPG: {
        type: Number
    },
    // field goal percent per game
    FGPercent: {
        type: Number
    },
    // 3 point shots made per game
    threePointMadePG: {
        type: Number
    },
    // 3 point shots attempted per game
    threePointAttPG: {
        type: Number
    },
    // 3 point percentage
    threePointPercent: {
        type: Number
    },
    // free throws made per game
    freeThrowMadePG: {
        type: Number
    },
    // free throws attempted per game
    freeThrowAttPG: {
        type: Number
    },
    // free throw percentage
    freeThrowPercent: {
        type: Number
    },
    // offensive rebounds per game
    offReboundsPG: {
        type: Number
    },
    // defensive rebounds per game
    defReboundsPG: {
        type: Number
    },
    // total rebounds per game
    totalReboundsPG: {
        type: Number
    },
    // assists per game
    assistsPG: {
        type: Number
    },
    // steals per game
    stealsPG: {
        type: Number
    },
    // blocks per game
    blocksPG: {
        type: Number
    },
    // turnovers committed per game
    turnoversPG: {
        type: Number
    },
});

const individualTeam = mongoose.model('Team', teamSchema);

module.exports = individualTeam;