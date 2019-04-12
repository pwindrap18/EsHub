const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const PlayerSchema = new mongoose.Schema({
    ign: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    birth: {
        type: Date,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    game: {
        type: String,
        required: true
    },
    photo: {
        type: String
    }
});

PlayerSchema.plugin(timestamp);

const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player