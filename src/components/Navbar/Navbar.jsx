import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { Link } from "react-router-dom";
import jwtDecode from 'jwt-decode'

const NavBar = (props) => {
    const [user, setUser] = useState(null)

    const jwt = localStorage.getItem('token')

    useEffect(() => {
        if (localStorage.getItem('token')){
          getUserInfo()
        }
      }, [])

    const getUserInfo = () => {
    try{
        const userInfo = jwtDecode(jwt)
        setUser(userInfo)
    }catch(err){
        console.log("getUserInfo error, line 24 ", err)
    }
    }

    return (
        <div className="row navbar">
        <div className="col-lg-8" align = "left" id = "logo">
          <h2>Transaction Tracker</h2>
        </div>
        <div className="col-lg-4" align = "right">
            <ul>
                {user ? 
                
                <React.Fragment> 
                  {/* <Link to ='/batch-add' className = "nav-item">Batch Add</Link> */}
                  <Link to = '/LandingPage' className = "nav-item">
                          <li>Home</li>
                    </Link>
                    <a onClick = {props.logoutUser} className='nav-item'> Log Out</a>
                </React.Fragment>
                
                :
                <React.Fragment>
                    <Link to = '/' className = "nav-item">
                          <li>Home</li>
                    </Link>
                    <Link to = '/login' className = "nav-item">
                        <li>Log In</li>
                    </Link>
                    <Link to = '/register' className = "nav-item">
                        <li>Register</li>
                    </Link>
                </React.Fragment>
                }
            </ul>
        </div>
    </div>
    );
}


export default NavBar;