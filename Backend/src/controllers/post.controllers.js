const postModel = require("../models/post.model")
const ImageKit  = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imageKit =  new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT

})

async function createpostcontroller(req,res){

    const token = res.cookie("token")

    if(!token){
        return res.status(404).json({
            message:"unauthorised user"
        })
    }


    const decoded = jwt.verify(token , process.env.jwt_sceret)
    
    console.log(decoded)
    

    const result  =  await imageKit.files.upload({
        file: req.file.buffer.toString("base64"),
        fileName : req.file.originalname
    })

    
}


module.exports = createpostcontroller;