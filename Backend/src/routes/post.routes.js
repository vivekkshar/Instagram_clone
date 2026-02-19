const express = require("express")
const createpostcontroller = require("../controllers/post.controllers")
const multer = require("multer")

const upload = multer({storage: multer.memoryStorage()})


const postRouter = express.Router()




postRouter.post("/" ,upload.single("image"), createpostcontroller )





module.exports = postRouter;
