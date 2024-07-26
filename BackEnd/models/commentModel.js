const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    postId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post', 
        required: true 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    content: {
        type: String, 
        required: true 
    },
    createdAt: {
         type: Date, 
         default: Date.now 
    },
  });
  
const commentModel = mongoose.model('Comment', CommentSchema);
module.exports= commentModel;