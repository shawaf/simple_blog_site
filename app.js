const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')
require('dotenv').config()

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
app.use(express.urlencoded({extended:true}));
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

//Mongoose and mongo sandbox route
//Save
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'New Blog2 ',
        snippet: 'This is the snippet of the new blog2',
        body: 'This is the body of the blog2'
    });
    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => { console.log(err); });
});
//View all blogs from DB
app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => { res.send(result); })
        .catch((err) => { console.log(err); })
});
app.get('/single-blog', (req, res) => {
    Blog.findById('63508e8469412f2bc8d1eeb8')
        .then((result) => { res.send(result); })
        .catch((err) => { console.log(err); })
});

//Routes
app.get('/', (req, res) => {
    //Send text
    // res.send('<p> Home Page </p>');
    //Send File by defining root in a parameter 
    //>>Using html files
    // res.sendFile('./views/index.html',{root: __dirname});
    //>>Using EJS
    // const blogs = [
    //     { title: 'About toptal blog', snippet: ' think Toptal should be the first one on the list, Here is a referral link from me, if someone applied using it and passed he will take a bonus up to 2500' },
    //     { title: 'Vancofur tech scne', snippet: 'Over the years, Vancouver has built a name for itself as a Tech Hub. Clarius Mobile Health has the pride to be recognized as ‘Top 100 Tech Companies’ in Vancouver as published in Business in Vancouver [BIV], ' },
    //     { title: 'Microsoft killing slack', snippet: 'Microsoft has gone after Slack with Teams, Notion with Loop, and now, Canva with Designer. 🩸 Why does this work? Lets break down their killer strategy below 👇' }
    // ];
    // res.render('index', { title: 'Home', blogs });
    res.redirect('/blogs');
});
//Get Blogs content from DB
app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt : -1 })
        .then((result) => {
            res.render('index',{title : 'All Blogs', blogs : result});
        })
        .catch((err) => { console.log(err); })
});

app.post('/blogs',(req,res)=>{
    const blog = new Blog(req.body);

    blog.save()
    .then((result)=>{
        console.log(result);
        res.redirect('/blogs');
    }).catch((err)=> { console.log(err);})
});

app.get('/about', (req, res) => {
    //Send text
    // res.send('<p> About Page </p>');
    //Send File by definig absolute path in one string
    //>> Using Html FIles
    // res.status(200).sendFile(`${__dirname}/views/about.html`);
    //>> Using EJS 
    res.render('about', { title: 'About' });
});

//Redirect
app.get('/about-us', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'New Blog' });
});
//404
app.use((req, res) => {
    //Using Html
    // res.status(404).sendFile(`${__dirname}/views/404.html`);
    //Using EJS
    res.render('404', { title: 'Page Not Found' });
})