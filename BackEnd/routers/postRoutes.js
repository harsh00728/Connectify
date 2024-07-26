const express= require('express');
const { createPostController, AllPostsController, deletePostController, likePostController, likesController} = require('../controllers/postController');
const multer= require('multer')
const path= require ('path')

// router object
const router= express.Router();

// --------- Routes -----------

    
    const Storage= multer.diskStorage({
        destination: (req, file, cb)=> {
            cb(null, "public/userImages");
        },
        filename: (req, file, cb)=> {
            cb(null, file.fieldname + "_"+ Date.now()+ path.extname(file.originalname));
        }
    })
    
    const upload= multer ({
        storage: Storage
    })

        // create-Post || POST
router.post('/post/create-post',upload.single('image'),  createPostController);

        // All-Posts || GET
router.get('/post/all-posts/:id', AllPostsController);

        // DELETE || DELETE
router.delete('/post/delete-post/:id', deletePostController);

        // Like-post || PUT
router.put('/post/post-like/:id', likePostController);

        // Likes || GET
router.get('/post/likes/:id', likesController);

module.exports= router;