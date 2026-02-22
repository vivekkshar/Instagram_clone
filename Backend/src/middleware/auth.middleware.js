const jwt = require("jsonwebtoken")

async function identifyuser(req, res , next ){
    const token = req.cookies.token 


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
    req.user = decoded 

    next()
}


module.exports = identifyuser;