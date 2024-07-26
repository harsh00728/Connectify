const postModel= require('../models/postModel');
const userModel= require('../models/userModel');

// create-post || POST
exports.createPostController= async(req, res)=>{
    console.log(req.file);
    const id= req.body.userId;
    const content= req.body.content;
    const image= req.file.filename;
    try{
        const post = new postModel({userId:id, content:content, image:image});
        await post.save();
        const user= await userModel.findById(id);
        user.post.push(post);
        user.save();
        return res.json({
            success: true,
            message: "Post Created",
            post
        });
    } catch(err){
        return res.json({
            success: false,
            message: "some error occur while posting New post",
        });
    }
    
}

// AllPosts  || GET
exports.AllPostsController= async(req, res)=>{
    try{
        const id= req.params.id;
        const user= await userModel.findById(id).populate("friends");
        const upost= user.post.map(post=> post._id);
        const userpost = await postModel.find({ _id: { $in: upost } }).populate('userId').sort({ createdAt: -1 });
        const friendIds= user.friends.map(friend=> friend._id);
        const posts = await postModel.find({ userId: { $in: friendIds } }).populate('userId').sort({ createdAt: -1 });
        return res.json({
            success: true,
            message: "all friends",
            posts,
            userpost
        })
    } catch(err){
        return res.json({
            success: false,
            message: "some error occur while getting all posts",
        });
    }
}


// delete post  || DELETE
exports.deletePostController= async(req, res)=> {
    try{
       // const {id}= req.params;
        const post= await postModel.findByIdAndDelete(req.params.id).populate("userId");
        await post.userId.post.pull(post);
        await post.userId.save();
        return res.json({
            success: true,
            message: 'blog deleted',
        });
    } catch(err){
        console.log(err);
        return res.json({
            success: false,
            message: 'error while deleting single blog',
            err,
        });    
    }
};


// like-post  || PUT
exports.likePostController= async(req, res)=> {
    try{
        let status;
        const post= await postModel.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            post.likes.push(req.body.userId);
            status= true;
        } else{
            post.likes = post.likes.filter(userId => userId.toString() !== req.body.userId);
            status= false;
        }
        await post.save();
        return res.json({
            success: true,
            status,
            post,
            likeCount: post.likes.length,
        })
    } catch(err){
        return res.json({
            success: false,
            err,
        })
    }
}


// likes  || GET
exports.likesController= async(req, res)=> {
    try{
        const post= await postModel.findById(req.params.id);
        return res.json({
            success: true,
            message: "likes counted",
            likeCount: post.likes.length,
        })
    } catch(err){
        return res.json({
            success: false,
            message: "there is some error occur while fetching likes of post",
            err,
        })
    }
}