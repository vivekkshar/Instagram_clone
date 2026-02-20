const postModel = require("../models/post.model")
const userModel = require("../models/user.model")
const ImageKit  = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imageKit =  new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT

})

async function createpostcontroller(req,res){

    const token = req.cookies.token 

    console.log(token)


    if(!token){
        return res.status(404).json({
            message:"unauthorised user"
        })
    }
    let decoded = null
    try{
         decoded = jwt.verify(token , process.env.jwt_sceret)
    }catch(err){
          return res.status(201).json({
            message:"user not authorised "
          })
    }

    
    
    console.log(decoded)
    

    const result  =  await imageKit.files.upload({
        file: req.file.buffer.toString("base64"),
        fileName : req.file.originalname,
        // folder:"cohort - Instagram-Clone "
    })
    // console.log(result)
    // console.log(result.url)
    


    const post = await postModel.create({
        caption:req.body.caption,
        imgurl : result.url,
        user : decoded.id
    })

    res.status(201).json({
       message: "Post created successfully ",
       post : post
    })

    
}

async function getpostcontroller(req, res){
    const token = req.cookies.token 
    
    let decoded;
    try{
        decoded = jwt.verify(token , process.env.jwt_sceret)
    }catch(err){
        return res.status(401).json({
            message:"token invalid"
        })

    }


    const userid = decoded.id
    

    if(!userid){
        return res.status(404).json({
            message:"unauthorised user"
        })
    }

    
    const posts = await postModel.find({
        user: userid 
    })
 
    res.status(200).json({
        message:"posts fetched succesfuly",
        posts: posts
    })

    
}

async function getpostdetails(req, res){
    
    
    const token = req.cookies.token 
    

    if(!token){
        return res.status(401).json({
            message:"unauthoried token "
        })
    }
    
    let decoded;

    try{
       decoded = jwt.verify(token , process.env.jwt_sceret)
    }catch(err){
          return res.status(401).json({
            message:"token invalid"
          })
    }

    
    const userid = decoded.id

    const postid= req.params.postid
    
    
    const post = await postModel.findById(postid)

    if(!post){
        return res.status(404).json({
            message:"post not found "
        })
    }
    
    const isvaliduser = post.user.toString() == userid 

    if(!isvaliduser){
        return  res.status(403).json({
        message:"forbidden content  "
    })
    }
    res.status(201).json({
        message:"post fetched succesfully",
        post : post
    })

}


module.exports = {
    createpostcontroller,
    getpostcontroller,
    getpostdetails
};