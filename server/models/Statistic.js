const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const StatisticSchema = new mongoose.Schema({
    team: {
        type: String,
        required: true
    },
    tournament: {
        type: String,
        required: true
    },
    game: {
        type: String,
        required: true
    },
    round: {
        type: String,
        required: true
    },
    win: {
        type: Number,
        default: 0
    },
    lose: {
        type: Number,
        default: 0
    },
    draw: {
        type: Number,
        default: 0
    },
    chicken: {
        type: Number,
        default: 0
    }
});

StatisticSchema.plugin(timestamp);

const Statistic = mongoose.model('Statistic', StatisticSchema);

module.exports = Statistic