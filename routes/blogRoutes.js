const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();

//Get Blogs content from DB
router.get('/', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result });
        })
        .catch((err) => { console.log(err); })
});

router.post('/', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            console.log(result);
            res.redirect('/blogs');
        }).catch((err) => { console.log(err); })
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'New Blog' });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', { title: "Blog Details", blog: result });
        })
        .catch(err => {
            console.log(err);
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch(err => {
            console.log(err);
        });
})

//Save
router.get('/add-blog', (req, res) => {
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
router.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => { res.send(result); })
        .catch((err) => { console.log(err); })
});

router.get('/single-blog', (req, res) => {
    Blog.findById('63508e8469412f2bc8d1eeb8')
        .then((result) => { res.send(result); })
        .catch((err) => { console.log(err); })
});


module.exports = router;