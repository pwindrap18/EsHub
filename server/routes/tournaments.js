const errors = require('restify-errors');
const Tournament = require('../models/Tournament');
const Team = require('../models/Team')

module.exports = server => {
    // Get Tournaments
    server.get('/tournaments', async (req, res, next) => {
        try {
            const tournaments = await Tournament.find({});
            res.send(tournaments)
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err));
        }
    });

    // Get single Tournament
    server.get('/tournaments/:id', async (req, res, next) => {
        try {
            const tournament = await Tournament.findById(req.params.id);
            res.send(tournament);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`Tournament not found`))
        };
    });

    // Add Tournament
    server.post('/tournaments', async (req, res, next) => {
            const {
                name,
                location,
                games,
                type,
                status,
                info,
                schedule,
                participants,
                fixtures
            } = req.body;

            const tournament = new Tournament({
                name,
                location,
                games,
                type,
                status,
                info,
                schedule,
                participants,
                fixtures
            })

            try {
                const newTournament = await tournament.save();
                res.send(201);
                next()
            } catch (err) {
                return next(new errors.InternalError(err.message));
            }
        }),

        // Update a Tournament
        server.put('/tournaments/:id', async (req, res, next) => {
            try {
                console.log(req.body)
                const tournament = await Tournament.findOneAndUpdate({
                    _id: req.params.id
                }, req.body);
                res.send(200);
                next()
            } catch (err) {
                return next(new errors.ResourceNotFoundError('tournament not found'))
            }
        });

    // Delete a Tournament
    server.del('/tournaments/:id', async (req, res, next) => {
        try {
            const tournament = await Tournament.findOneAndDelete({
                _id: req.params.id
            });
            res.send(204);
            next()
        } catch (error) {
            return next(new errors.ResourceNotFoundError('tournament not found'))
        };
    });

    //Get Participants
    server.get('/tournaments/participants/:id', async (req, res, next) => {
        try {
            const tournament = await Tournament.findById({
                _id: req.params.id
            });
            console.log(tournament.name)
            const participants = await Team.find({
                tournaments: tournament.name
            });
            console.log(participants)
            res.send(201)
        } catch (error) {
            return next(new errors.ResourceNotFoundError('tournament not found'))
        }
    })
};