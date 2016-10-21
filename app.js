var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var app = express();

//Connection to DB
mongoose.connect('mongodb://localhost/users', function (err, res) {
	if(err) throw err;
	console.log('Connect to Database');
});

//Middlewares
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

//Import Models and Controllers
var models = require('./models/user')(app, mongoose);
var UserCtrl = require('./controllers/users');

var router = express.Router();

//Index - Route
router.get('/',function (req, res) {
	res.send('Hola Mundo Api RestFull');
});

app.use(router);

//Api routes
var api = express.Router();

api.route('/users')
	.get(UserCtrl.findAll)
	.post(UserCtrl.add);

api.route('/users/:id')
	.get(UserCtrl.findById)
	.put(UserCtrl.update)
	.delete(UserCtrl.delete);

app.use('/api',api);

//Start server
app.listen(3000,function () {
	console.log('Node server running on http://localhost:3000');
});