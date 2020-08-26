const express = require('express');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const router = express.Router();

// @route   POST api/posts
// @desc    Create or Update Post
// @access  Private

router.post('/',[
    auth,
    [
        check('text', 'Text is required').not().isEmpty()
    ]
], async (req, res) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( { errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }

        const post = await new Post(newPost).save();

        return res.json(post);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error!')
    }
});

// @route   Get api/posts/:post_id
// @desc    Get post by id
// @access  Public
router.get('/:post_id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        return res.json(post)
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error!')
    }
});

// @route   Get api/posts
// @desc    Get all posts
// @access  Public
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        return res.json({ posts: posts});
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error!')
    }
})
module.exports = router;

// @route   DELETE api/posts
// @desc    Get all posts
// @access  Public