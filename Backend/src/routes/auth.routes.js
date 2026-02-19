const express = require("express")
const{ registercontroller , logincontroller} = require ("../controllers/auth.controllers")


const authRouter = express.Router()


authRouter.post("/register" , registercontroller )

authRouter.post("/login" , logincontroller )

module.exports = authRouter;