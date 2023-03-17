import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './CSS/signup.css'

function Signup(props) {

  const [user, setUser] = useState({name:'', email: '', password: '' });
  const navigate=useNavigate();

  async function signup(e){
    e.preventDefault();
    try{

      const response= await fetch("https://vast-goat-slacks.cyclic.app/api/createuser",{
        method:'POST',
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({name:user.name,email:user.email,password:user.password})
      })
      const respdata=await response.json();
      if(respdata.success) navigate("/login")
      if(respdata.errors)
      {let errors=respdata.errors;
        props.updateAlert("Error: ",errors)
      }
    }catch(err){
      console.warn(err)
    }


  }

  function handleChange(e) {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }
  return (
    <div className="container-signup   ">
    <h2 className='text-center signupBanner'>SignUp</h2>
    <form onSubmit={signup} >
    <div className="form-group my-4">
        <label htmlFor="exampleInputName" className='my-2'>Name</label>
        <input type="text" className="form-control" id="exampleInputName" placeholder="Enter your name" name='name' value={user.name} onChange={handleChange} required />
      </div>
      <div className="form-group my-4">
        <label htmlFor="exampleInputEmail1" className='my-2'>Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="abc@mail.com" name='email' value={user.email} onChange={handleChange} required />
      </div>
      <div className="form-group my-4">
        <label htmlFor="exampleInputPassword1" className='my-2'>Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="*************" name='password' value={user.password} onChange={handleChange} required />
        <p className='text-secondary'>Enter a minimum 7 digit password</p>
      </div>

      <button type="submit" className="btn btn-primary signup-btn" disabled={user.name.trim()==='' || user.email.trim()==='' || user.password.trim()===''}>Submit</button>
    </form>
  </div>

  )
}

export default Signup