import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router,Routes,Route,Navigate, BrowserRouter} from "react-router-dom";
import Login from './pages/login';
import HomePage from './pages/homepage';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/homePage' element={<HomePage/>}/>
         
        </Routes>
      </Router>
    </>
  )
}

export default App
