const User = require("../models/user.model");
const Post = require("../models/post.model");

// ----- Post Controller ----- //
class PostController {
    // get post by id
    async getById(req, res) {
        // get post
        const post = await Post.findById(req.params.postId).populate("author");
        // response
        return res.status(200).json(post);
    }
    // get posts for home page
    async getAll(req, res) {
        // get posts
        const posts = await Post.find().limit(10).populate("author");
        // response
        return res.status(200).json(posts);
    }
    // create new post
    async create(req, res) {
        // get authenticated user
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ message: "invalid user" });
        }
        // create new post instance
        const post = new Post({ ...req.body, author: user._id });
        // save post
        await post.save();
        // response
        return res.status(201).json(post);
    }
    // update post by id
    async update(req, res) {
        // get authenticated user
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ message: "invalid user" });
        }
        // get post
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(400).json({ message: "invalid post" });
        }
        // check if the user is post author
        if (user._id.toString() !== post.author.toString()) {
            return res.status(400).json({ message: "access denied" });
        }
        // set new data
        post.set(req.body);
        // save post
        await post.save();
        // response
        return res.status(200).json(post);
    }
    // delete post by id controller
    async delete(req, res) {
        // get authenticated user
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ message: "invalid user" });
        }
        // get post
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(400).json({ message: "invalid post" });
        }
        // check if the user is post author
        if (user._id.toString() !== post.author.toString()) {
            return res.status(400).json({ message: "access denied" });
        }
        // delete post
        await post.deleteOne();
        // response
        return res.status(200).json({ message: "post deleted successfully" });
    }
    // like post by id controller
    async like(req, res) {
        // get authenticated user
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ message: "invalid user" });
        }
        // get post
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(400).json({ message: "invalid post" });
        }
        if (post.likes.includes(user._id.toString())) {
            // remove like
            post.likes.pull(user._id)
        } else {
            // like post
            post.likes.addToSet(user._id)
        }

        await post.save()
        // response
        return res.status(200).json(post.likes);
    }
}

module.exports = new PostController();
