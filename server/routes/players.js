const router = require('express').Router()
const Player = require("../models/Player");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(new Error("please upload an image"), false);
  }
};

const upload = multer({
  storage
  // fileFilter
});


// Get players
router.get("/", async (req, res, next) => {
  try {
    const players = await Player.find(req.query);
    res.send(players);
    next();
  } catch (err) {
    return next(new errors.InvalidContentError(err));
  }
});

// Add player
router.post("/", upload.single("photo"), async (req, res, next) => {
  const photo = req.file ? req.file.path : "img.jpeg";

  const {
    ign,
    name,
    team,
    age,
    game
  } = req.body;

  const newPlayer = new Player({
    ign,
    name,
    age,
    team,
    game,
    photo
  });

  try {
    const player = await newPlayer.save();
    res.send(201);
    next();
  } catch (err) {
    return next(new errors.InternalError(err.message));
  }
});

// Get single player
router.get("/:id", async (req, res, next) => {
  try {
    const player = await Player.findById({
      _id: req.params.id
    });

    res.send(player);
    next();
  } catch (err) {
    return next(new errors.ResourceNotFoundError(err.message));
  }
});

// Update player
router.put('/:id', upload.single('logo'), async (req, res, next) => {

  try {
    if (req.file) {
      console.log(req.file.path)
      const player = await Player.findOneAndUpdate({
        _id: req.params.id
      }, {
        logo: req.file.path
      });
    }

    const player = await Player.findOneAndUpdate({
      _id: req.params.id
    }, req.body);


    res.send(201);
    next()
  } catch (error) {
    console.log(error)
    return next(new errors.ResourceNotFoundError('team not found'));
  };
});

// Delete player
router.delete('/:id', async (req, res, next) => {
  try {
    const player = await Player.findOneAndDelete({
      _id: req.params.id
    });
    res.send(204);
    next()
  } catch (error) {
    return next(new errors.ResourceNotFoundError('team not found'));
  };
});

module.exports = router