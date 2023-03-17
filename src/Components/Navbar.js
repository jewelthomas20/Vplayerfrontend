import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from './images/vplayerLogo.png'
import './CSS/navbar.css'

function Navbar() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(0);

  function logout() {
    localStorage.removeItem('auth-token')
    navigate('/')
  }

  async function getNotification() {
    const response = await fetch("http://localhost:5000/displayNotification", {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem('auth-token')
      }
    });
    const respData = await response.json();
    if (respData.notification) {
      const notification = respData.notification.length
      setNotification(notification);
    }
  }
  const auth=localStorage.getItem('auth-token')

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      getNotification()
    }
    
  }, [auth])
  return (
    <header className='position-sticky top-0 z-1'>
      <nav className="navbar navbar-expand-lg  bg-light ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" width={50} height={50}/>
          <span>Vplayer</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/">Home</Link>
              </li>
              {
                localStorage.getItem('auth-token') ? <>
                  <li className="nav-item " style={{}}>
                    <Link className="nav-link" to="" onClick={logout}>Logout</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={()=>setNotification(0)}>Notification 
                    {notification >0 && 
                    <span className="badge badge-pill bg-danger position-absolute"style={{padding:'2px 5px ',fontSize:''}}> {notification} </span>}</Link>
                  </li>
                </> :
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/signup">Signup</Link>
                    </li>
                  </>
              }
            </ul>

          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar