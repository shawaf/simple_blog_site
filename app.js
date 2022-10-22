const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('ejs');
require('dotenv').config()
const blogsRoutes = require('./routes/blogRoutes');
const aboutRoutes = require('./routes/aboutRoutes');

//Express App
const app = express();

//Connect to mongodb
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connected to db');
        //Listen for requests
        app.listen(3000)
    })
    .catch((err) => { console.log(err); });


//Register view engine (use Views folder to add all ejs files)
app.set('view engine', 'ejs');

//MiddleWare & static files 
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
//3rd Party logger
app.use(morgan('dev'));
//Manual Logger
// app.use((req,res,next)=>{
//     console.log('new request made');
//     console.log('host : ',req.hostname);
//     console.log('path : ',req.path);
//     console.log('method : ',req.method);
//     next();
// });



//Routes
app.get('/', (req, res) => {res.redirect('/blogs');});
app.use('/blogs',blogsRoutes);
app.use('/about',aboutRoutes);

//404
app.use((req, res) => {
    //Using Html
    // res.status(404).sendFile(`${__dirname}/views/404.html`);
    //Using EJS
    res.render('404', { title: 'Page Not Found' });
})