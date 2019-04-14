const errors = require('restify-errors');
const Statistic = require('../models/Statistic');

module.exports = server => {
    // Get Tournaments
    server.get('/statistics', async (req, res, next) => {
        try {
            const statistics = await Statistic.find(req.query);
            res.send(statistics)
            next()
        } catch (err) {
            return next(new errors.InvalidContentError(err.message));
        };
    });

    // Add Statistic
    server.post('/statistics', async (req, res, next) => {
        const {
            team,
            tournament,
            game,
            round,
            result
        } = req.body;

        const newStatistic = new Statistic({
            team,
            tournament,
            game,
            round,
            result
        });

        try {
            const statistic = await newStatistic.save()
            res.send(201, {
                statistic
            })
            next()
        } catch (err) {
            return next(new errors.InternalError(err.message));
        }
    });

    // Update Statistic
    server.patch('/statistics/:id', async (req, res, next) => {
        try {
            const statistic = await Statistic.findOneAndUpdate({
                _id: rreq.params.id
            }, req.body);
            res.send(201);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(err.message));
        };
    });

    // Delete Statistic
    server.del('/statistic/:id', async (req, res, next) => {
        try {
            const statistic = await Statistic.findOneAndDelete({
                _id: req.params.id
            });
            res.send(201);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(err.message));
        }
    })
};