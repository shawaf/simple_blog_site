const Blog = require('../models/blog');


// Functions Needed => blog_index, blog_details, blog_create_get, blog_create_post, blog_delete
//Find All
const blog_index_sorted = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs/index', { title: 'All Blogs', blogs: result });
        })
        .catch((err) => { console.log(err); })
};

const blog_index_notsorted = (req, res) => {
    Blog.find()
        .then((result) => { res.send(result); })
        .catch((err) => { console.log(err); })
};

//Find Single
const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('blogs/details', { title: "Blog Details", blog: result });
        })
        .catch(err => {
            res.status(404).render('404', {title : "Page Not Found"});
        });
};
//Save
const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            console.log(result);
            res.redirect('/blogs');
        }).catch((err) => { console.log(err); })
};

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'New Blog' });
};

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch(err => {
            console.log(err);
        });
};

const blog_save_fixed = (req, res) => {
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
};

const blog_single_fixed = (req, res) => {
    Blog.findById('63508e8469412f2bc8d1eeb8')
        .then((result) => { res.send(result); })
        .catch((err) => { console.log(err); })
};
module.exports = {
    blog_index_sorted, blog_index_notsorted, blog_details, blog_create_post, blog_create_get, blog_delete, blog_save_fixed, blog_single_fixed
};