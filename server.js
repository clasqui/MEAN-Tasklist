var express = require('express'),
	path 	= require('path'),
	bodyParser = require('body-parser');

var index = require('./routes/index'),
	tasks = require('./routes/tasks');

var app = express();

var port = 3000;

//view engine
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

// Set Static Folder

app.use(express.static(path.join(__dirname, 'client')));

//Body Parser MW

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:false
}));

app.use('/', index); //./routes/indexjs
app.use('/api',tasks); // ./routes/tasks

app.listen(port, function() {
	console.log('server started on port: ' + port);
})