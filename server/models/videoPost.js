import mongoose from 'mongoose';

const videoSchema = mongoose.Schema({
     title: String,
     message: String,
     name: String,
     creator: String,
     tags: [String],
     youtubeURL: String,
     likes: { type: [String], default: [] },
     comments: { type: [String], default: [] },
     createdAt: {
          type: Date,
          default: new Date(),
     },
});

let videoPost = mongoose.model('videoPost', videoSchema);

export default videoPost;