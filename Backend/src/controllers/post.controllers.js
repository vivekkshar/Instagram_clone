const postModel = require("../models/post.model")
const ImageKit  = require("@imagekit/nodejs")



const imageKit =  new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT

})

async function createpostcontroller(req,res){

    

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
        user : req.user.id
    })

    res.status(201).json({
       message: "Post created successfully ",
       post : post
    })

    
}

async function getpostcontroller(req, res){
   


    const userid = req.user.id
    

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
    
    
    

    
    const userid = req.user.id

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