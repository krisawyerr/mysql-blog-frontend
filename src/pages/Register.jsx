import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({username:"", email:"", password:""});
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const donaim = "https://mysql-blog-backend.vercel.app";

  function handleChange(e) {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  async function handleRegister(e) {
    e.preventDefault()
    try {
      await axios.post(`${donaim}/api/auth/register`, inputs);
      navigate("/login")
    } catch(err) {
      setErr(err.response.data)
    }
  }

  return (
    <div className='auth'>
      <form>
      <h1>Register</h1>
        <input required type="text"  placeholder='username' name='username' onChange={handleChange}/>
        <input required type="email"  placeholder='email' name='email' onChange={handleChange}/>
        <input required type="password" placeholder='password' name='password' onChange={handleChange}/>
        <button onClick={handleRegister}>Register</button>
        {err && <p>{err}</p>}
        <span>Already Registered? <Link to="/Login"><span className='formLink'>Login</span></Link></span>
      </form>
    </div>
  )
}

export default Register