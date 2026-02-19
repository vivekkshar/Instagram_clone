const mongoose = require("mongoose")



const postSchema =  new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgurl :{
        type:String,
        required:[true , "this is required for making post"]
    },
    user:{
        ref:"users",
        type: mongoose.Schema.Types.ObjectId,
        required:[true , "this is required for making post"]
    }
})



const postModel = mongoose.model("posts" , postSchema)


module.exports = postModel;