const followModel =  require("../models/follow.model")
const userModel =  require("../models/user.model")


async function  followusercontroller(req ,res) {

    const followerusername = req.user.username;
    const followingusername = req.params.username;

    // Check if user is trying to follow themselves
    if (followerusername === followingusername) {
        return res.status(400).json({
            message: "You can't follow yourself"
        });
    }

    // Check if followee user exists
    const isuserexist = await userModel.findOne({ username: followingusername });
    if (!isuserexist) {
        return res.status(404).json({
            message: "User not exists"
        });
    }

    // Check if already following
    const isuseralreadyfollows = await followModel.findOne({
        follower: followerusername,
        following: followingusername
    });
    if (isuseralreadyfollows) {
        return res.status(400).json({
            message: "You already follow this account"
        });
    }

    // Create follow record
    const followrecord = await followModel.create({
        follower: followerusername,
        following: followingusername
    });

    res.status(201).json({
        message: `You are following ${followingusername}`,
        followrecord
    });
}

async function unfollowusercontroller(req,res){
        const followerusername = req.user.username;
        console.log(followerusername)
        const followingusername = req.params.username;
        console.log(followingusername)
        const isuserfollowing = await followModel.findOne({
                follower: followerusername,
                following: followingusername
        });
        console.log(isuserfollowing)

        // if (isuserfollowing) {
        //         return res.status(200).json({
        //                 message: `You are not following ${followingusername}`
        //         });
        // }

        // await followModel.findByIdAndDelete(isuserfollowing._id);
        // res.status(200).json({
        //         message: `You have unfollowed ${followingusername}`,
                
        // });
}

module.exports = {followusercontroller,unfollowusercontroller};