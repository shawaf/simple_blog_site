const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

//Get Blogs content from DB
router.get('/', blogController.blog_index_sorted);
router.post('/',blogController.blog_create_post );
router.get('/create', blogController.blog_create_get);
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.blog_delete);
//Save with fixed data
router.get('/add-blog', blogController.blog_save_fixed);
//View all blogs from DB
router.get('/all-blogs', blogController.blog_index_notsorted);

router.get('/single-blog', blogController.blog_single_fixed);


module.exports = router; 