var express = require('express');
var favicon=require('serve-favicon');
var app = express();
var bodyParser = require('body-parser');
//var jwt = require('jsonwebtoken');

var path = require('path');
var rootPath = path.normalize(__dirname);
var nodePort = '1602';

app.use(express.static(rootPath));
//console.log(rootPath);
//app.use('/node_modules', express.static(rootPath + '/node_modules'))

var mongoose = require('mongoose');

//Database in the cloud 
/*
mongoose.connect('mongodb://admin:123456@ds043972.mongolab.com:43972/blog', function (err) {
    if (err) { console.error("error! " + err) }
});
*/
/*mongoose.connect('mongodb://localhost:27017/ferro', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database ferro');
  }
});*/

var producto=mongoose.Schema({
     nombre:String,
     marca:String,
     precio:Number,
     foto:String
   });

var Producto = mongoose.model('producto', producto);


//bodyparser to read json post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Load mongodb model schema
app.get('/productos', function(req, res) {
        Producto.find({}, function(err, docs) {
            if(err) return console.error(err);
            res.json(docs);
        });
    });
app.post('/producto', function(req, res) {
        var obj = new Producto(req.body);
        obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.json(obj);
        });
    });



app.get('/', function(req, res) {
  res.render('index');
});



  // delete by id
 
    app.delete('/producto/:id', function(req, res) {
        Producto.findOneAndRemove({_id: req.params.id}, function(err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        });
    });

app.listen(nodePort);
console.log(new Date() + ' Listening on port: ' + nodePort);
