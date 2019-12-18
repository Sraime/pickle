const express = require('express');
const routes = require('./app/routes');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var config = require('./config');

const app = express();

//Set up default mongoose connection
var mongoDB = 'mongodb://' + config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.db;
mongoose.connect(mongoDB, { useNewUrlParser: true })
.then(() => {
  console.log('Connection to database has been established successfully.');
})
.catch(err => {
  console.log('Unable to connect to the database:', err);
});

app.use(cors({origin:true,credentials: true}));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  console.log("received : "+req.method+" "+req.originalUrl+" (Authorization: "+req.get("Authorization")+")");
  next();
});
app.use('/', routes);

app.listen(config.app.port, function () {
  console.log('[ENV='+config.app.env+'] Application running on port '+config.app.port);
})