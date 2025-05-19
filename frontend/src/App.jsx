import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router,Routes,Route,Navigate, BrowserRouter} from "react-router-dom";
import Login from './pages/login';
import HomePage from './pages/homepage';
import UserProfile from './pages/userProfile';
import OtherProfilePage from './pages/otherProfile';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/homePage' element={<HomePage/>}/>
          <Route path='/myProfile' element={<UserProfile/>}/>
          <Route path='/userProfile'element={<OtherProfilePage/>}/> 
        </Routes>
      </Router>
    </>
  )
}

export default App
