const express = require("express")
const { followusercontroller , unfollowusercontroller } = require("../controllers/follow.controllers")
const identifyuser = require("../middleware/auth.middleware")

const userRouter = express.Router()


userRouter.post("/follow/:username" , identifyuser , followusercontroller)
userRouter.post("/unfollow/:username" ,identifyuser , unfollowusercontroller)





module.exports = userRouter ;