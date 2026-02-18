const mongoose = require("mongoose")


const userSchema = new  mongoose.Schema({
    username :{
        type : String,
        unique :[true, "username already exists" ],
        required : [true, "username required" ],
    },
    email: {
        type: String ,
        unique : [true , " Email already exists"],
        required:[ true, "Email required "]
    },
    password :{
        type:String,
        required: [true , "passowrd is required"]
    },
    bio :{
        type:String,

    },
    profileImage:{
        type:String ,
        default:"https://ik.imagekit.io/wq5vewdbt/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
    }


})


const userModel  =  mongoose.model("users", userSchema)


module.exports =  userModel