const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")


async function  registercontroller(req,res) {
    const {username , email, password , profileImage , bio}  =  req.body

    const isuseralreadyexist  =  await  userModel.findOne({
        $or:[
             {email},
             {username}
        ]
    })

    if(isuseralreadyexist){
        return res.status(409).json({
            message: (isuseralreadyexist.email == email ? " email already exists" :"username already exists " )
        })
    }

    const hash  = await  bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        bio,
        password:hash,
        profileImage,

    })

    const token = jwt.sign({
        id : user._id,
    }, process.env.jwt_sceret)

    console.log(token)

    res.cookie("token",  token )


    res.status(201).json({
        message:"user created",
        user
    })

}


async function logincontroller(req ,res) {
    const {email, username , password}  = req.body 
    
    const user = await userModel.findOne({
        $or: [
            { username :username},
            { email: email}
        ]
    })

    if(!user){
        return res.status(404).json({
            message :"user not found"
        })
        
    }

    const ispasswordvalid =  await bcrypt.compare(password , user.password )


    const token = jwt.sign(
        {id: user._id},
        process.env.jwt_sceret
    )

    res.cookie("token", token )
    res.status(200).json({
        message:"login succesfully ",
        user:{
            username:user.username,
            email:user.email,
            profileimage :user.profileImage,
            bio:user.bio,

        }
    })


}



module.exports = {
    registercontroller,
    logincontroller
}