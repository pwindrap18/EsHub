const errors = require('restify-errors');
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
    // fileFilter
})

module.exports = server => {
    // Get players
    server.get('/players', async (req, res, next) => {
        try {
            const players = await Player.find({});
            res.send(players);
            next()
        } catch (err) {
            return next(new errors.InvalidContentError(err))
        }
    });

    // Add player
    server.post('/players', upload.single('photo'), async (req, res, next) => {
        console.log(req.file)
        const {
            ign,
            name,
            birth,
            team,
            game
        } = req.body;

        const newPlayer = new Player({
            ign,
            name,
            birth,
            team,
            game,
            photo: req.file.path
        });

        try {
            const player = await newPlayer.save();
            res.send(201);
            next()
        } catch (error) {
            return next(new errors.InternalError(err.message));
        }
    })
}