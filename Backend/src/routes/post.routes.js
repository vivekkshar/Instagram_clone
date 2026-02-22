const express = require("express")
const {createpostcontroller, getpostcontroller, getpostdetails} = require("../controllers/post.controllers")
const multer = require("multer")
const identifyuser = require("../middleware/auth.middleware")

const upload = multer({storage: multer.memoryStorage()})


const postRouter = express.Router()




postRouter.post("/" ,upload.single("image"), identifyuser, createpostcontroller )

postRouter.get("/", identifyuser, getpostcontroller )

postRouter.get("/details/:postid",identifyuser, getpostdetails)



 


module.exports = postRouter;
