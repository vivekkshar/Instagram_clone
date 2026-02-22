const express = require("express")
const followusercontroller = require("../controllers/follow.controllers")
const identifyuser = require("../middleware/auth.middleware")

const postRouter = express.Router()


postRouter.post("/follow/:username" , identifyuser , followusercontroller)





module.exports = postRouter ;