import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { AuthContext } from '../context/authContext.jsx';

const Login = () => {
  const [inputs, setInputs] = useState({email:"", password:""});
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  console.log(login)

  function handleChange(e) {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await login(inputs)
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  }

  return (
    <div className='auth'>
      <form>
        <h1>Log in</h1>
        <input required type="email"  placeholder='email' name='email' onChange={handleChange}/>
        <input required type="password" placeholder='password' name='password' onChange={handleChange}/>
        <button onClick={handleLogin}>login</button>
        {err && <p>{err}</p>}
        <span>Not Registered? <Link to="/Register"><span className='formLink'>Register</span></Link></span>
      </form>
    </div>
  )
}

export default Login