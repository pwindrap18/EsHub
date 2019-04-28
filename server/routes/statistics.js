const router = require('express').Router()
const Statistic = require('../models/Statistic');


// Get Tournaments
router.get('/', async (req, res, next) => {
    try {
        const statistics = await Statistic.find(req.query);
        res.send(statistics)
        next()
    } catch (err) {
        return next(new errors.InvalidContentError(err.message));
    };
});

// Add Statistic
router.post('/', async (req, res, next) => {
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
router.patch('/:id', async (req, res, next) => {
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
router.delete('/:id', async (req, res, next) => {
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

module.exports = router