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
    result: Array
});

StatisticSchema.plugin(timestamp);

const Statistic = mongoose.model('Statistic', StatisticSchema);

module.exports = Statistic