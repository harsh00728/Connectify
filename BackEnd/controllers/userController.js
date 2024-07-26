const userModel= require('../models/userModel');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const nodemailer = require('nodemailer');

// create user register user.
exports.registerController= async(req, res)=> {
    try{
        const {username, email, password}= req.body;
        // validation.
        if(!username || !email || !password){
            return res.json({
                success: false,
                message: "please fill all fields"
            });
        }
        //existing user
        const existingUser= await userModel.findOne({email});
        if(existingUser){
            return res.json({
                success: false,
                message: "user already exists"
            })
        }

        // encrypt password before saving into DB
        const hashedPassword= await bcrypt.hash(password, 10);

        // save new user
        const user= new userModel({username, email, password: hashedPassword})
        await user.save();
        return res.json({
            success: true,
            message: "new user created",
            user
        })
    } catch(err){
        console.log(err);
        return res.json({
            message: "Error in Register callback",
            success: false,
            err
        })
    }
};

// get all users except Main User.
exports.getAllUsers= async (req, res)=> {
    const id= req.query.q;
    try{
        const users= await userModel.find({ _id: { $ne: id } }).populate("connection");

        return res.json({
            userCount: users.length,
            success: true,
            message: "all users data",
            users
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

//login
exports.loginController= async (req, res)=> {
    try{
        const {email, password}= req.body;
        // validation.
        if(!email || !password){
            return res.json({
                success: false,
                message: "please provide email or passwod"
            })
        }
        const user= await userModel.findOne({email});
        if(!user){
            return res.json({
                success: false,
                message: "email is not registered"
            })
        }
        // password.
        const isMatch= await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({
                success: false,
                message: "Invalid username or password"
            })
        }

        //token
        const token= jwt.sign({username: user.username}, process.env.KEY, {expiresIn:'1h'});
        res.cookie('token', token, {httpOnly: true ,maxAge: 360000});

        return res.json({
            success: true,
            message: "login successfully",
            user
        })
    } catch(err){
        console.log(err);
        return res.json({
            success: false,
            message: "error in login callback",
            err
        })
    }
};

exports.forgotPasswordController= async (req, res)=> {
    const {email}= req.body;
    try{
        const user= await userModel.findOne({email});
        if(!email){
            return res.status(401).send({
                success: false,
                message: "please provide email"
            })
        }

        if(!user){
            return res.status(200).send({
                success: false,
                message: "email is not registered"
            })
        }
        const token= jwt.sign({id:user._id}, process.env.KEY, {expiresIn: '5m'});
        
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'harsh07hps@gmail.com',
              pass: 'ngrf epgc pqbs cssz'
            }
          });
          
          var mailOptions = {
            from: 'harsh07hps@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: `http://localhost:5173/resetPassword/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              return res.status(500).send({
                success: false,
                message: "Error in sending Email"
              })
            } else {
                return res.status(200).send({
                    success: true,
                    message: "Email send"
                  })
            }
          });

    } catch(err){
        console.log(err);
        return res.status(500).send({
            success: false,
            message: "There is some error in sending link",
            err
        })
    }
}

// reset password.
exports.resetPasswordController= async (req, res)=> {
    const {token}= req.params;
    const {password}= req.body;
    try{
        const decoded= await jwt.verify(token, process.env.KEY);
        const id= decoded.id;
        const hashPassword= await bcrypt.hash(password, 10);
        await userModel.findByIdAndUpdate({_id: id}, {password: hashPassword});
        return res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        })
    } catch(err){
        console.log(err);
        return res.status(500).send({
            success: false,
            message: "There is some error in Password Resetting",
            err
        })
    }
}

// Update user
exports.updateUserController= async(req, res)=> {
    try{
        const {id} = req.params;
        const user= await userModel.findByIdAndUpdate(id, {...req.body}, {new:true});
        return res.json({
            success: true,
            message: 'User details updated',
            user,
        });
    } catch(err){
        console.log(err);
        return res.json({
            success: false,
            message: 'Error while updating user',
            err
        });
    }
};

// user Data
exports.userDataController= async(req, res)=> {
    try{ 
        const userData= await userModel.findById(req.params.id);
        return res.json({
            success: true,
            message: "successfully get users data",
            userData,
        });
    } catch(err){
        console.log(err);
        return res.json({
            success: false,
            message: 'error in getting users data',
            err
        });
    }
};


// update-image || POST
exports.updateImageController= async(req, res)=>{
    console.log(req.file.filename);
    const image= req.file.filename;
    const id= req.query.q;
    try{
        const user= await userModel.findByIdAndUpdate(id, {image: image});
        return res.json({
            success: true,
            message: "image Updated successfully",
            user,
        });
    } catch(err){
        return res.json({
            success: false,
            message: "some error occur while updating image",
        });
    }
}




























// // verify controller
// const verifyUser = async (req, res, next)=> {
//     try{
//         const token= req.cookies.token;
//         if(!token){
//             return res.json({status: false, message: "no token"});
//         }
//         const decoded= await jwt.verify(token, process.env.Key);
//         next();
//     } catch(err){
//         return err.json(err);
//     }
// }

// exports.verifyController= verifyUser, (req, res)=> {
//     return res.json({status: true, message:"authorized"});
// }



// // get Single User.
// exports.singleUserController= async (req, res)=> {
//     const {email}= req.params;
//     try{
//         const user= await userModel.findOne({email});
//         if(!user){
//             return res.status(404).send({
//                 success: false,
//                 message: 'User not found with this id',
//                 user
//             });
//         }
//         return res.status(200).send({
//             success: true,
//             message: "Get Single User data",
//             user,
//         })
//     } catch(err){
//         console.log(err);
//         return res.status(500).send({
//             success: false,
//             message: "error in Get Single User",
//             err
//         })
//     }
// };