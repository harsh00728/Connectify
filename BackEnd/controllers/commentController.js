const commentModel= require('../models/commentModel');
const postModel= require('../models/postModel');

// creating Comment 
exports.sendCommentController= async (req, res) => {
    const { postId, userId, content } = req.body;
    try {
        const post=  await postModel.findById(postId);
        const comment = new commentModel({ userId:userId, postId:postId, content:content });
        await comment.save();
        post.comments.push(comment);
        await post.save();
        return res.json({
            success: true,
            message: "comment created",
            comment
        });
    } catch (err) {
        res.json({ 
            error: err.message 
        });
    }
}

// get All Comments
exports.getAllComments= async (req, res)=> {
    const postId= req.query.q;
    try{
        const comments= await commentModel.find({postId: postId}).populate("userId");
        return res.json({
            success: true,
            message: "all comments data",
            comments
        })
    } catch(err){
        console.log(err);
        return res.json({
            success: false,
            message: "error in Get All Comments",
            err
        })
    }
};

// delete-comment  || DELETE
exports.deleteCommentController= async(req, res)=> {
    try{
       // const {id}= req.params;
        const comment= await commentModel.findByIdAndDelete(req.params.id).populate("postId");
        await comment.postId.comments.pull(comment);
        await comment.postId.save();
        return res.json({
            success: true,
            message: 'comment deleted',
        });
    } catch(err){
        console.log(err);
        return res.json({
            success: false,
            message: 'error while deleting comment',
            err,
        });    
    }
};