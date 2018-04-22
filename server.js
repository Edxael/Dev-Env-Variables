// -----------------------------------------------------------------
const express = require('express')
const app = express()
const ejs = require('ejs')



// -----------------------------------------------------------------
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/views'))
 
 

 
// -----------------------------------------------------------------
app.get('/', (req, res) => { res.render('pages/00-home.ejs') })
app.get('/1', (req, res) => { res.render('pages/01-books.ejs') })
app.get('/2', (req, res) => { res.render('pages/02-contactus.ejs') })
 
 

 
// ----------------------------------------------------------------
app.listen(5000, (err) => {
    if(err){ throw err }
    console.log("Server-Running.......")
})