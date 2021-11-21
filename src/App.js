import './App.css';
import { Navigate, Routes, Route } from 'react-router';
import React, { useState, useEffect } from 'react';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar'
import Login from './components/Login/Login'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Register from './components/Register/Register';

function App() {

  const [user, setUser] = useState(null) 
  const [data, setData] = useState(false)
  const [modalShow, setModal] = useState(false)
  
  const loginURL = 'http://127.0.0.1:8000/api/auth/login/'
  const registerURL = 'http://127.0.0.1:8000/api/auth/register/'
  const jwt = localStorage.getItem('token')
  const authHeader = {headers: {'Authorization': 'Bearer ' + jwt}}

  useEffect(() => {
    if (localStorage.getItem('token')){
      getUserInfo()
    }
  }, [])

  const toggleRegistrationModal = () => {
    setModal(!modalShow);
  }

  const registerUser = async(registerInfo) => {
    try{ 
      await axios.post(registerURL, registerInfo)
      loginUser({'username': registerInfo.username, 'password': registerInfo.password})
    }catch (err){
      console.log("RegisterUser funcion error, line 31", err)
    }
  }

  const loginUser = async(loginInfo) => {
    try{
      let userInfo = await axios.post(loginURL, loginInfo)
      localStorage.setItem('token', userInfo.data.access)
      getUserInfo();
      window.location = '/home'
    } catch(err){
      console.log("LoginUser error line 40", err)
    }
  }

  const logoutUser = async() => {
    try{
      localStorage.removeItem('token')
      setUser(null);
      window.location = "/"
    }catch(err){
      console.log("logoutUser error, line 51", err)
    }
  }

  const getUserInfo = () => {
    const jwt = localStorage.getItem('token')
    try{
      const userInfo = jwtDecode(jwt)
      setUser(userInfo)
      setData(true)
    }catch(err){
      console.log("getUserInfo error, line 61", err)
    }
  }



  return (
    data ? 
    (<div className="App">
      <Navbar logoutUser = {logoutUser} toggleRegistrationModal = {toggleRegistrationModal} />
      <Routes>
          <Route path = "/" exact render = {props => <Home {...props} />} />
          <Route path = "/login" render = {props => <Login {...props} loginUser = {loginUser}/>} />
          <Route path = "/register" render = {props => <Register {...props} />} />
          <Route path= "/home" render = {props => 
          {
            if(localStorage.getItem("token") == null){
              
              return <Navigate to = "/login" />
            } else {
              return <Navigate to = "/LandingPage" />
            }
          }}
           />
      </Routes>
    </div>)
    :
    (<div className="App">
    <Navbar logoutUser = {logoutUser}/>
    <Routes>
      <Route path = "/" exact render = {props => <Home {...props} />} />
      <Route path = "/login" render = {props => <Login {...props} loginUser = {loginUser}/>} />
      <Route path = "/register" render = {props => <Register {...props} registerUser = {registerUser} />} />
      <Route 
      path= "/home"
      render = {props => {
        if(localStorage.getItem("token") == null){
          
          return <Navigate to = "/login" />
        } else {
          return <Navigate to = "/LandingPage" />
        }
      }}
       />
    </Routes>
</div>)

  );
}

export default App;
