const express = require('express');

const router = express.Router();


router.get('/', (req, res) => {
    //Send text
    // res.send('<p> About Page </p>');
    //Send File by definig absolute path in one string
    //>> Using Html FIles
    // res.status(200).sendFile(`${__dirname}/views/about.html`);
    //>> Using EJS 
    res.render('about', { title: 'About' });
});

module.exports= router;