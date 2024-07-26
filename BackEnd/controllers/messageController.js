const messageModel= require('../models/messageModel');

// all-messages  || GET
exports.allMessagesController= async (req, res)=> {
    const {userId, friendId}= req.params;
    try{ 
        const messages= await messageModel.find({
            $or: [
                { senderId: userId, receiverId: friendId },
                { senderId: friendId, receiverId: userId },
              ],
        }).populate("receiverId").sort('timestamp');
        return res.json({
            success: true,
            message: "successfully get all messages",
            messages,
        })
        
    } catch(err){
        console.log(err);
        return res.json({
            success: false,
            message: 'error in getting all messages',
            err
        });
    }
}


