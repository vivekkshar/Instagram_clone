const mongoose = require("mongoose")



const postSchema =  new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    type:String,
    required:[true , "this is required for making post"]
})



const postModel = mongoose.model("posts" , postSchema)


module.exports = postModel;