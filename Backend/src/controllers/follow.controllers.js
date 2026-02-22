const followModel =  require("../models/follow.model")


async function  followusercontroller(req ,res) {

      const followerusername  = req.user.username
      
      const followeeusername = req.params.username

      const followrecord =  await followModel.create({
        followername : followerusername,
        followee  : followeeusername
      })

      res.status(201).json({
        message :  `you are following ${followerusername}`,
        followrecord
      })
      
}

module.exports = followusercontroller;


