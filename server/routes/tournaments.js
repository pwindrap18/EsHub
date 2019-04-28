const router = require('express').Router()
const Tournament = require('../models/Tournament');
const Team = require('../models/Team')
const multer = require("multer");


const storage = multer.diskStorage({
    destination: ((req, file, cb) => {
        cb(null, './uploads');
    }),
    filename: ((req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname)
    })
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(new Error('please upload an image'), false)
    }
}

const upload = multer({
    storage,
    fileFilter
})


// Get Tournaments
router.get('/', async (req, res, next) => {
    try {
        const tournaments = await Tournament.find(req.query);
        res.send(tournaments)
        next();
    } catch (err) {
        return next(err);
    }
});

// Get single Tournament
router.get('/:id', async (req, res, next) => {
    try {
        const tournament = await Tournament.findById(req.params.id);
        res.send(tournament);
        next();
    } catch (err) {
        return next(err)
    };
});

// Add Tournament
router.post('/', upload.single('image'), async (req, res, next) => {
        image = req.file ? req.file.path : "img.jpeg"

        const {
            name,
            location,
            games,
            type,
            status,
            info,
            schedule,
            participants,
            fixtures,
            liveStreams
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
            fixtures,
            image,
            liveStreams
        })

        try {
            const newTournament = await tournament.save();
            res.send(201);
            next()
        } catch (err) {
            return next(err.message);
        }
    }),

    // Update a Tournament
    router.put('/:id', upload.single('image'), async (req, res, next) => {
        try {
            if (req.file) {
                const tournament = await Tournament.findOneAndUpdate({
                    _id: req.params.id
                }, {
                    image: req.file.path
                });
            }

            const tournament = await Tournament.findOneAndUpdate({
                _id: req.params.id
            }, req.body);
            res.send(200);
            console.log(req.body);

            next()
        } catch (err) {
            return next(err)
        }
    });

// Delete a Tournament
router.delete('/:id', async (req, res, next) => {
    try {
        const tournament = await Tournament.findOneAndDelete({
            _id: req.params.id
        });
        res.send(204);
        next()
    } catch (err) {
        return next(err)
    };
});

//Get Participants
router.get('/participants/:id', async (req, res, next) => {
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
    } catch (err) {
        return next(err)
    }
})

module.exports = router