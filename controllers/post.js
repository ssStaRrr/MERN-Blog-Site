const Post = require("../models/Post")
const { StatusCodes } = require("http-status-codes")

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        res.status(StatusCodes.OK).json(posts)
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({
            message: error.message
        })
    }
}
const getSinglePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        res.status(StatusCodes.OK).json(post)
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({
            message: error.message
        })
    }
}
const updatePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(id, post, {new:true});
        res.status(StatusCodes.OK).json(updatedPost)
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({
            message: error.message
        })
    }
}

const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new Post(post)
    try {
        await newPost.save();
        res.status(200).json(newPost)
    } catch (error) {
        res.status(409).json({
            message: error.message
        })
    }
}

const deletePost = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const deletedPost = await Post.findByIdAndRemove(_id);
        res.status(StatusCodes.OK).json(deletedPost)
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({
            message: error.message
        })
    }
}

module.exports = {
    getAllPosts,
    createPost,
    getSinglePost,
    updatePost,
    deletePost
}