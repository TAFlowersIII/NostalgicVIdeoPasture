import mongoose from 'mongoose';
import videoPost from '../models/videoPost.js';

export const getPosts = async (req, res) => {
     const { page } = req.query;
     try {
          const LIMIT = 8;
          const startIndex = (Number(page) - 1)*LIMIT;
          const total = await videoPost.countDocuments({});

          const posts = await videoPost.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

          res.status(200).json({data: posts,
          currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });

     } catch(error) {

          res.status(404).json({
               message: error.message
          });
     }
}

export const getPost = async (req, res) => {
     const { id } = req.params;
     try {
          const post = await videoPost.findById(id);
          res.status(200).json(post);
     
     } catch(error) {
          res.status(404).json({
               message: error.message 
          });
     }
}

export const getPostsBySearch = async (req, res) => {
     const {searchQuery, tags } = req.query;

     try {
          //Get videos from here
          const title = new RegExp(searchQuery, 'i');
          // const posts = await videoPost.find({ $or: [ {title}, {tags: { $in: tags.split(',')} }] });
          res.json({ data: 'test' });

     } catch(error) {
          res.status(404).json({message: error.message });
          console.log(error);
     }
}

export const createPost = async (req, res) => {
     const post = req.body;
     const newVideoPost = new videoPost({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
     console.log('***newVideoPost:', newVideoPost);

     try {
          await newVideoPost.save();
          res.status(201).json(newVideoPost);

     } catch(error) {
          res.status(409).json({message: error.message});
     }
}

export const updatePost = async (req, res) => {
     const { id: _id } = req.params;
     const post = req.body;

     if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Error: Sorry, no post with this ID.")

     const updatedVideoPost = await videoPost.findByIdAndUpdate(_id, { ...post, _id }, {new: true });

     res.json(updatedVideoPost);
}

export const commentPost = async (req, res) => {
     const { id } = req.params;
     const { value } = req.body;

     const post = await PostMessage.findById(id);

     post.comments.push(value);

     const updatedVideoPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

     res.json(updatedVideoPost)
}

export const deletePost = async(req, res) => {
     const { id } = req.params;

     if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Error: No post with this ID.")
     
     await videoPost.findByIdAndRemove(id);

     console.log('DELETE POST');

     res.json({ message: "Post deleted successfully."});
}

export const likePost = async (req, res) => {
     const { id } = req.params;

     if(!req.userId) return res.json({ message: "***Error: User isn't authenticated. Please log in to perform this action."});

     if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("***Error: No post with this ID.");

     const post = await videoPost.findById(id);

     const index = post.likes.findIndex((id) => id === String(req.userId) );

     if (index === -1) {
          post.likes.push(req.userId);
     } else {
          post.likes = post.likes.filter((id) => id !== String(req.userId));
     }

     const updatedVideoPost = await videoPost.findByIdAndUpdate(id, post, { new: true });

     res.json(updatedVideoPost);
}