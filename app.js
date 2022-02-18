require('dotenv').config();
const cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hunt = require('./hunts');
const { getAllHunts, getAllLocationsFromHunt, getHunt } = require('./queries');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/allhunts', (req, res) => {
  getAllHunts(req, res);
});

app.get('/locations/:huntid', (req, res) => {
  getAllLocationsFromHunt(req, res);
})

app.get('/hunt/:huntid', (req, res) => {
  getHunt(req, res);
})


module.exports = app;
