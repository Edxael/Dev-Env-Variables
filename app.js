var express = require('express');
var app = express();
var ejs = require('ejs');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./views/dbSchemas/01-book');


// ----- Conecting to the DataBase ------
mongoose.connect('mongodb://bookuser:book123@ds013564.mlab.com:13564/books1', function(err){
if(err){
  console.log(err);
}else {
  console.log("Conected to DataBase.");
}
});



// BodyParser will get the information from from organize as object and save in variable data1
var data1 = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req, res){
  res.render('pages/01-index.ejs');
});

app.get('/ad', function(req, res){
  res.render('pages/02-add.ejs');
});



app.get('/al', function(req, res){
  Book.find({})
  .exec(function(err, libros){
    if(err){ throw err; }
    console.log(libros);
    res.render('pages/03-all.ejs', {data: libros});
  });
});





app.post('/', data1, function(req, res, next){
  console.log(req.body);
  res.render('pages/09-done.ejs', {data: req.body});

        var papiro = new Book();

        papiro.title = req.body.title;
        papiro.author = req.body.author;
        papiro.category = req.body.category;

        papiro.save(function(err, data){
          if(err){
            return console.log("Error inserting to Database.");
          }else {

            if(err){
              res.send(data);
            }
            console.log("");
            console.log("The following Data Has Been Posted to Doatabase");
            console.log(data);
            console.log("");

          }
        });
});




app.listen(3000, function(err){
  if(err){ throw err; }
  console.log("Server up and running.......");
});
