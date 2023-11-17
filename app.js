const express  = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const app = express();

// const {communityAmenities} = require('./routes/amenities')
//db config
const db =require('./config/Keys').MongoURI;

//connect

mongoose.connect(db)
.then(() => console.log("MongoDb connected"))
.catch(err => console.log(err))
 
//EJS
app.set('view engine','ejs');
app.use(expressLayouts);


//BodyParserMiddleware
app.use(express.urlencoded({ extended: false }));


app.use('/',require('./routes/index'));

app.use('/users',require('./routes/users'));
app.use('/dashboard',require('./routes/dashboards'));
app.use('/amenities',require('./routes/amenities'));
app.use('/bookTour',require('./routes/bookTour'));
app.use('/contactUs',require('./routes/contactUs'));


// app.use('/amenities',(req,res)=>{
//     res.render('amenities');
// })

// app.use('/bookTour',(req,res)=>{
//     res.render('bookTour');
// })

// app.use('/contactUs',(req,res)=>{
//     res.render('contactUs');
// })

app.listen(8080,() =>{
    console.log('Server is running on port 5000');
});