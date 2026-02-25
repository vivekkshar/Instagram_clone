const mongoose = require("mongoose")


const likeSchema =  mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectID,
        ref:"posts",
        required:[true , "post id is required for creating a like "]

    },
    user:{
        type:String,
        required:[true , "username  is required for creating a like "]
    }
},{timestamps:true})


likeSchema.index({posts:1 , user:1}, {unique:true})

const likeModal = mongoose.model("likes" ,  likeSchema)


module.exports = likeModal;