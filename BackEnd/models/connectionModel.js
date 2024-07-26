const mongoose = require('mongoose');

const ConnectionRequestSchema = new mongoose.Schema({
  sender:{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true },

  receiver: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true },
    
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected'], 
    default: 'pending' },

  createdAt: { 
    type: Date, 
    default: Date.now },
});

const connectionModel= mongoose.model('ConnectionRequest', ConnectionRequestSchema);
module.exports = connectionModel;
