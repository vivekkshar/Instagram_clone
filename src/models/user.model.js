const mongoose = require("mongoose")


const userSchema = new  mongoose.Schema({
    username :{
        type : string,
        unique :[true, "username already exists" ],
        required : [true, "username required" ],
    },
    email: {
        type: string ,
        unique : [true , " Email already exists"],
        required:[ true, "Email required "]
    },
    password :{
        type:string,
        required: [true , "passowrd is required"]
    },
    bio :{
        type:string,

    },
    profileImage:{
        type:string ,
        default:"https://ik.imagekit.io/wq5vewdbt/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
    }


})


const userModel  =  mongoose.model("users", userSchema)


module.exports =  userModel