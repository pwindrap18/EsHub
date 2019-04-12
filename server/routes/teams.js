const errors = require('restify-errors');
const Team = require('../models/Team');
const Player = require('../models/Player');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: ((req, file, cb) => {
        cb(null, './uploads/');
    }),
    filename: ((req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname)
    })
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(new Error('please upload an image'), false)
    }
}

const upload = multer({
    storage,
    fileFilter
})

module.exports = server => {
    // Get Teams
    server.get('/teams', async (req, res, next) => {
        try {
            const teams = await Team.find({});
            res.send(teams);
            next()
        } catch (err) {
            return next(new errors.InvalidContentError(err))
        }
    });

    // Get single team
    server.get('/teams/:id', async (req, res, next) => {
        try {
            const team = await Team.findById({
                _id: req.params.id
            });
            res.send(team);
            next()
        } catch (error) {
            next(new errors.ResourceNotFoundError('team not found'))
        }
    })

    // Add Team
    server.post('/teams', upload.single('logo'), async (req, res, next) => {
        const {
            name,
            owner,
            details,
            games,
            tournaments,
            logo
        } = req.body

        logo = req.file ? req.file.path : "img.jpeg"

        const team = new Team({
            name,
            owner,
            details,
            games,
            tournaments,
            logo
        });

        try {
            const newTeam = await team.save();
            res.send(201);
            next();
        } catch (err) {
            return next(new errors.InternalError(err.message));
        }
    });

    // Update team
    server.put('/teams/:id', async (req, res, next) => {
        try {
            console.log(req.params)
            const team = await Team.findOneAndUpdate({
                _id: req.params.id
            }, req.body);

            if (req.file) {
                const player = await Team.findOneAndUpdate({
                    _id: req.params.id
                }, {
                    photo: req.file.path
                });
            }

            res.send(201);
            next()
        } catch (error) {
            console.log(error)
            return next(new errors.ResourceNotFoundError('team not found'));
        };
    });

    // Delete team
    server.del('/teams/:id', async (req, res, next) => {
        try {
            const team = await Team.findOneAndDelete({
                _id: req.params.id
            });
            res.send(204);
            next()
        } catch (error) {
            return next(new errors.ResourceNotFoundError('team not found'));
        };
    });

    // Get players
    server.get('/teams/players/:id', async (req, res, next) => {
        try {
            console.log(req.params.id)
            const team = await Team.findById({
                _id: req.params.id
            });
            const players = await Player.find({
                team: team.name
            });
            res.send(players);
            next()
        } catch (error) {
            return next(new errors.ResourceNotFoundError('team not found'));
        }
    })
};