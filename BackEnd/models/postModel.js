const mongoose = require('mongoose');

const postSchema= new mongoose.Schema({
    content:{
        type: String,
        required: true,
    },
    image:{
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:[true, "user id is required"],
    },
    likes: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Comment'
        }
    ],
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

const postModel= mongoose.model('Post', postSchema);

module.exports= postModel;