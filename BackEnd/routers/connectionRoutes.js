const express= require('express');
const {searchController, sendRequestController, allRequestController, acceptRequestController, declineRequestController, connectionController,  allFriendsController, removeFriendController} = require('../controllers/connectionController');

// router object
const router= express.Router();



//get User friends || GET
router.get('/friends', searchController);

//get all-Connection-request || GET
router.get('/all-requests', allRequestController);

//send Request || POST
router.post('/connection/send', sendRequestController);

// Accept Request || POST
router.post('/connection/accept', acceptRequestController);

// Decline Request || POST
router.post('/connection/decline', declineRequestController);

// add to friends || POST
router.post('/connection', connectionController);

//all- friends of user || GET
router.get('/all-friends', allFriendsController);

//remove Request || POST
router.post('/remove-friend', removeFriendController);

module.exports= router;