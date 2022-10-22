const http = require('http');
const fs = require('fs');
const _= require('lodash');

const server = http.createServer((req, res) => {
    console.log("request made");

    const num = _.random(0,20);
    console.log(num);
    //>>>>>Text Response in Header
    // res.setHeader('Content-Type','text/plain');
    //>>>>>Html Response In Header
    res.setHeader('Content-Type', 'text/html');

    //>>>>>send html as a text
    // res.write('<H1>Hello, World</H1>');
    // res.write('<h2> This is test text</h2>');
    // res.end();

    //>>>>>>Route Urls 
    let viewsPath = './views/';

    switch (req.url) {
        case '/':
            viewsPath += 'index.html';
            res.statusCode=200;
            break;
        case '/about':
            viewsPath += 'about.html';
            res.statusCode=200;
            break;
        case '/about-me':
                res.statusCode=301;
                res.setHeader('Location','/about');
                res.end();
                break;
        default:
            viewsPath += '404.html';
            res.statusCode=404;
            break;
    }

    //>>>>>send html from file.
    fs.readFile(viewsPath, (err, data) => {
        if (err) {
            console.log(err);
            res.end()
        } else {
            res.write(data);
            res.end();
        }
    });
});




server.listen(3000, 'localhost', () => {
    console.log('Listening to requests on localhost:3000');
}); 