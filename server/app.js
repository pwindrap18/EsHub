var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const username = process.env.MLAB_USERNAME
const pass = process.env.MLAB_PASS
mongoose.connect(`mongodb://${username}:${pass}@ds135456.mlab.com:35456/eshub`, {
  useNewUrlParser: true
})

var playersRouter = require('./routes/players');
var teamsRouter = require('./routes/teams');
var tournamentsRouter = require('./routes/tournaments');
var statisticsRouter = require('./routes/statistics');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

app.use('/players', playersRouter);
app.use('/users', teamsRouter);
app.use('/tournaments', tournamentsRouter);
app.use('/statistics', statisticsRouter);



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected')
});



module.exports = app;