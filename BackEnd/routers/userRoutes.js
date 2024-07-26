const express= require('express');
const { getAllUsers, registerController, loginController, forgotPasswordController, resetPasswordController, updateUserController, userDataController, updateImageController} = require('../controllers/userController');
const multer= require('multer')
const path= require ('path')

// router object
const router= express.Router();

    // get all users || GET
router.get('/all-users', getAllUsers);

    // create user || POST
router.post('/register', registerController);    

    // Login || POST
router.post('/login', loginController);

     // forgot Password || POST
router.post('/forgot-password', forgotPasswordController);

    // reset Password || POST
router.post('/reset-password/:token', resetPasswordController);

    // update User || PUT
router.put('/update-user/:id', updateUserController);

    // User Data || GET
router.get('/user-data/:id', userDataController);


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

    // Update Image || POST
router.post('/update-image',upload.single('image'),  updateImageController);

module.exports= router;