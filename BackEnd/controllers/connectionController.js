const connectionModel= require('../models/connectionModel');
const userModel= require('../models/userModel');

// get search 
exports.searchController= async(req, res)=> {
    try {
        const searchQuery = req.query.q;
        const friends = await userModel.find({
            username: { $regex: searchQuery, $options: 'i' },
        }).populate("connection");
        res.json(friends);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// get all connection requests.
exports.allRequestController= async(req, res)=> {
    try{
        const data= await connectionModel.find({status: "pending"}).populate("sender").populate("receiver");
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// sending request 
exports.sendRequestController= async (req, res) => {
    const { senderId, receiverId } = req.body;
    try {
        // check requested already or not.
        const data= await connectionModel.find({$or: [{receiver: receiverId, sender: senderId}, {receiver: senderId, sender: receiverId}]});
        if(data.length >0){
            if(data[0].status == "accepted"){
                return res.json({
                    success: false,
                    message: "Can't send request You are already Friends", 
                    data 
                });
            } else{
                return res.json({
                    success: false,
                    message: "Request already in Queue check Notification",  
                    data
                });
            }
        }

        const senderUser=  await userModel.findById(senderId);
        const receiverUser=  await userModel.findById(receiverId);
        const request = new connectionModel({ sender: senderId, receiver: receiverId });
        await request.save();
        senderUser.connection.push(request);
        await senderUser.save();
        receiverUser.connection.push(request);
        await receiverUser.save();
        return res.json({
            success: true,
            message: "Connection request sent!",
            request
        });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}


// accept request 
exports.acceptRequestController= async (req, res) => {
    const { requestId } = req.body;
    try {
      const request = await connectionModel.findById(requestId);
      request.status = 'accepted';
      await request.save();
      res.json(request);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}


// decline request 
exports.declineRequestController= async (req, res) => {
    const { requestId } = req.body;
    try {  
      const request = await connectionModel.findByIdAndDelete(requestId).populate("sender");
      request.sender.connection.pull(request);
      request.sender.save();
      res.json(request);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}


// connection or Add friends || POST
exports.connectionController= async (req, res) => {
    const { receiverId, senderId } = req.body;
    try {
      const receiver = await userModel.findById(receiverId);
      receiver.friends.push(senderId);
      await receiver.save();
      const sender = await userModel.findById(senderId);
      sender.friends.push(receiverId);
      await sender.save();
      return res.json({
        success: true,
        message: "friend added",
        receiver, 
        sender
      })
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}


// get all friends of user. || GET
exports.allFriendsController= async (req, res)=> {
    const id= req.query.q;
    try{
        const user= await userModel.findById(id).populate("friends");

        return res.json({
            success: true,
            message: "all users data",
            user
        })
    } catch(err){
        console.log(err);
        return res.json({
            success: false,
            message: "error in Get All Users",
            err
        })
    }
};


// remove-friend  || POST
exports.removeFriendController= async (req, res) => {
    const { senderId, receiverId } = req.body;
    try{
        const senderUser=  await userModel.findById(senderId);
        const receiverUser=  await userModel.findById(receiverId);
        const request= await connectionModel.findOneAndDelete({$or: [{receiver: receiverId, sender: senderId}, {receiver: senderId, sender: receiverId}]});
        senderUser.connection.pop(request);
        receiverUser.connection.pop(request);
        senderUser.friends.pop(receiverId);
        receiverUser.friends.pop(senderId);
        senderUser.save();
        receiverUser.save();
        return res.json({
            success: true,
            message: "Friend Removed",
        });

    } catch(err){
        res.status(500).json({ error: err.message });
    }
}