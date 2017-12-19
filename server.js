var express = require('express'),
	path 	= require('path'),
	bodyParser = require('body-parser');

var index = require('./routes/index'),
	tasks = require('./routes/tasks');

var app = express();