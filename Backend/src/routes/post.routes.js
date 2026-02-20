const express = require("express")
const {createpostcontroller, getpostcontroller, getpostdetails} = require("../controllers/post.controllers")
const multer = require("multer")

const upload = multer({storage: multer.memoryStorage()})


const postRouter = express.Router()




postRouter.post("/" ,upload.single("image"), createpostcontroller )

postRouter.get("/", getpostcontroller )

postRouter.get("/details/:postid", getpostdetails)

 


module.exports = postRouter;
