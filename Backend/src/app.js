
const express = require ("express")
const cookieParser = require("cookie-parser")
const cores = require("cors")
const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")
const userRouter = require("./routes/user.routes")


const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cores({
    credentials:true,
    origin:"http://localhost:5173"
}))
app.use(express.urlencoded({extended:true}))
app.use("/api/auth" , authRouter )
app.use("/api/posts" ,  postRouter)
app.use("/api/user" , userRouter)



module.exports = app 

