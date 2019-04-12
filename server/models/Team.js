const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    games: Array,
    logo: String,
    tournaments: Array
});

TeamSchema.plugin(timestamp);

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team