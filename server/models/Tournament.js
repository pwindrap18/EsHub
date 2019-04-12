const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const TournamentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: Array,
        required: true
    },
    games: Array,
    type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    schedule: {
        type: Date,
        required: true
    },
    fixtures: Array
});

TournamentSchema.plugin(timestamp);

const Tournament = mongoose.model('Tournament', TournamentSchema);
module.exports = Tournament