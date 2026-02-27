import { useState } from 'react'
import { Link } from 'react-router-dom'
import "../styles/Register.scss"
import axios from 'axios'

const Register = () => {
   
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  async function handlesubmit(e){
    e.preventDefault()

    axios.post("http://localhost:3000/api/auth/register",{
      username,
      email,
      password
    },{
      withCredentials:true
    }).then(res => {
      console.log(res.data)
    })

  }

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="logo">Register</h1>
        <p className="subtitle">
          Sign up to see photos and videos from your friends.
        </p>

        <form onSubmit={handlesubmit} className="register-form">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setusername(e.target.value) }
            className="input-field"
          />

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setemail(e.target.value) }
            className="input-field"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value) }
            className="input-field"
          />

          <button type="submit" className="register-btn">
            Sign Up
          </button>
        </form>

        <p className="login-text">
          Already have an account?
          <Link className="login-btn" to="/Login">Log In</Link>
        </p>
      </div>
    </div>
  )
}

export default Register;