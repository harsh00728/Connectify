const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    firstName: {
        type:String,
    },
    middleName:{
        type:String,
    },
    lastName: {
        type:String,
    },
    skills:{
        type: String,
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    
    country:{
        type:String,
    },
    city:{
        type:String,
    },
    school:{
        type:String,
    },
    college:{
        type:String,
    }, 
    phone:{
        type:Number,
    },
    bio:{
        type:String,
    },
    image: {
        
        type: String,
        default: "https://w7.pngwing.com/pngs/67/469/png-transparent-computer-icons-login-button-miscellaneous-orange-computer.png",
    }, 
    connection: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ConnectionRequest",
        }
    ],
    post:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        }
    ]
}, {timestamps:true});

const userModel= mongoose.model("User", userSchema);

module.exports= userModel;