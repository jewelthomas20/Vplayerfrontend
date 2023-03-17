import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './CSS/login.css'

function Login(props) {
  const [user, setUser] = useState({ email: '', password: '' })
  const navigate=useNavigate();
  async function login(e) {
    e.preventDefault();
try{

  const response = await fetch("https://vast-goat-slacks.cyclic.app/api/login",
  {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, password: user.password })
      }
    )
    let respData = await response.json();
    
    if (respData.token) {
      const authtoken = respData.token;
      localStorage.setItem('auth-token',authtoken)
      navigate('/')

    }
    if(respData.errors) props.updateAlert('Error',respData.errors)
  }catch(err){
    console.log(err)
  }
   
     

  }

  function handleChange(e) {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }
  return (
    <div className="container-login ">
    <h2 className=' text-center loginBanner'>Login</h2>

      <form onSubmit={login}>
        <div className="form-group my-4">
          <label htmlFor="exampleInputEmail1" className='my-2'>Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="abc@mail.com" name='email' value={user.email} onChange={handleChange} required />
        </div>
        <div className="form-group my-4">
          <label htmlFor="exampleInputPassword1" className='my-2'>Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="*************" name='password' value={user.password} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-primary login-btn" disabled={user.email.trim()==='' || user.password.trim()===''} >Submit</button>
      </form>
    </div>

  )
}

export default Login