const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const verifyToken = require('../middleware/auth')

// @route GET api/posts
// @desc Get all posts
// @access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate('user', 'username')
        
        return res.json({ success: true, posts })
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: 'Internal server error'
            })
    }
})

// @route POST api/posts
// @desc Create post
// @access Private
router.post('/', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body

    // Simple vaidation
    if (!title)
        return res
            .status(400)
            .json({
                success: false,
                message: 'Title is required'
            })

    try {
        const newPost = new Post({
            title,
            description,
            url: (url.startsWith('https://')) ? url : `https://${url}`,
            status,
            user: req.userId
        })
        
        await newPost.save()

        return res
            .json({
                success: true,
                message: 'Happy learning',
                post: newPost
            })
    } catch (error) {
        console.log(error.message)

        return res
            .status(500)
            .json({
                success: false,
                message: 'Internal server error'
            })
    }
})

// @route PUT api/posts
// @desc Update post
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body

    // Simple vaidation
    if (!title)
        return res
            .status(400)
            .json({
                success: false,
                message: 'Title is required'
            })

    try {
        let updatedPost = {
            title,
            description,
            url: (url.startsWith('https://')) ? url : `https://${url}`,
            status
        }
        
        const postUpdateCondition = { _id: req.params.id, user: req.userId }

        updatedPost = await Post.findOneAndUpdate(
            postUpdateCondition,
            updatedPost,
            { new: true }
        )

        // User not authorised to update post
        if (!updatedPost)
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'Post not found or user not authorised'
                })
        
        return res
            .json({
                success: true,
                message: 'Exellent progress',
                post: updatedPost
            })
    } catch (error) {
        console.log(error.message)

        return res
            .status(500)
            .json({
                success: false,
                message: 'Internal server error'
            })
    }
})

// @route DELETE api/posts
// @desc Delete post
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id, user: req.userId }
        const deletedPost = await Post.findOneAndDelete(postDeleteCondition)

        // User not authorised to update post
        if (!deletedPost)
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'Post not found or user not authorised'
                })
        
        return res
            .json({
                success: true,
                message: 'Post deleted successfully',
                post: deletedPost
            })
    } catch (error) {
        
    }
})

module.exports = router