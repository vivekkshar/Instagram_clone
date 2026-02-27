import { useState  } from 'react'
import { Link } from 'react-router-dom'
import "../styles/Login.scss"
import axios from "axios"


const Login = () => {

    
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")

    async function handlesubmit(e){
        e.preventDefault()

        axios.post("http://localhost:3000/api/auth/login",{
            username,
            password
        },{
            withCredentials:true
        }).then(res => {
            console.log(res.data)
        })


    }

    

    



  return (
   <div className="login-container">
      <div className="login-box">
        <h1 className="logo">Login</h1>

        <form onSubmit={handlesubmit} className="login-form">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setusername(e.target.value)}
            className="input-field"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
            className="input-field"
          />

          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <p className="register-text">
          Don't have an account?
          <Link className="register-btn" to="/Register" >Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login;