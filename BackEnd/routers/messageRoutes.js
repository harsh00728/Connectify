const express= require('express');
const {allMessagesController, deleteMessageController} = require('../controllers/messageController');

// router object
const router= express.Router();

// all-messages  || GET
router.get('/all-messages/:userId/:friendId', allMessagesController);


module.exports= router;