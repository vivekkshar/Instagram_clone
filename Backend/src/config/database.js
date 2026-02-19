const mongoose = require("mongoose")


async function connecttodb(){
    await mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        console.log("connected to db ")
    })
}


module.exports =  connecttodb