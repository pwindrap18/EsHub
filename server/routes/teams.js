const router = require('express').Router()
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


// Get Teams
router.get('/', async (req, res, next) => {
    const conditions = req.query

    try {
        const teams = await Team.find(req.query);
        res.send(teams);
        next()
    } catch (err) {
        return next(new errors.InvalidContentError(err))
    }
});

// Get single team
router.get('/:id', async (req, res, next) => {
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
router.post('/teams', upload.single('logo'), async (req, res, next) => {
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
router.put('/:id', upload.single('logo'), async (req, res, next) => {
    try {
        if (req.file) {
            const team = await Team.findOneAndUpdate({
                _id: req.params.id
            }, {
                logo: req.file.path
            });
        }

        const team = await Team.findOneAndUpdate({
            _id: req.params.id
        }, req.body);


        res.send(201);
        next()
    } catch (error) {
        return next(new errors.ResourceNotFoundError('team not found'));
    };
});

// Delete team
router.delete('/:id', async (req, res, next) => {
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
router.get('/players/:id', async (req, res, next) => {
    try {
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

module.exports = router