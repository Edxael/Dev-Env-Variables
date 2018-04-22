// ===[ IMPORTING DEPENDENCIES ]===================================================================
var express = require('express')
var app = express()
var ejs = require('ejs')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var Book = require('./views/dbSchemas/01-book')
require('dotenv/config')  // <--- Enviroment Variables.
console.log("-----------------------------------------------------------------------")





// ===[ MIDDLE-WARE ]==============================================================================
mongoose.connect( `mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@ds013564.mlab.com:13564/books1` , { useMongoClient: true } , (err) => {
  console.log( (err) ? ("MLabs Conection to DataBase: FAIL..... \n   --> " + err ) : "Conection to DataBase: SUCCESS... \n." )
});

var data1 = bodyParser.urlencoded({ extended: false })   // <--- BodyParser will get the information from from organize as object and save in variable data1

app.set('view engine', 'ejs')
app.use(morgan('dev'))
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'))
app.use(express.static(__dirname + '/views'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))






// ===[ ROUTES ]==================================================================================
app.get('/', (req, res) => {
  res.render('pages/01-index.ejs')
})

app.get('/ad', (req, res) => {
  res.render('pages/02-add.ejs')
})

app.get('/al', (req, res) => {
  Book.find({})
      .exec(function(err, libros){
          if(err){ throw err }
          console.log(libros)
          res.render('pages/03-all.ejs', {data: libros})
      })
})



app.post('/', data1, (req, res, next) => {   // <-- Posting new book to DataBase.
  res.render('pages/09-done.ejs', {data: req.body})

        var papiro = new Book()

        papiro.title = req.body.title
        papiro.author = req.body.author
        papiro.category = req.body.category

        papiro.save( (err, data) => {
          if(err){
            return console.log("Error inserting to Database: ", err)
          }else {
            if(err){ res.send(data) }
            console.log(". \n   The following Data Has Been Posted to Doatabase \n.", data)
          }
        })
})





// ===[ SERVER-LISTENER ]============================================================================
app.listen(5000, (err) => {
  if(err){ throw err }
  console.log("Server up and running.......")
})
