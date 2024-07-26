const express= require('express');
const { sendCommentController, getAllComments, deleteCommentController } = require('../controllers/commentController');

// router object
const router= express.Router();

// --------- Routes -----------

// create comment || POST
router.post('/send-comment', sendCommentController);

// get all comments of particular person || GET
router.get('/all-comments', getAllComments);

// delete-comment || DELETE
router.delete('/delete-comment/:id', deleteCommentController);


module.exports= router;