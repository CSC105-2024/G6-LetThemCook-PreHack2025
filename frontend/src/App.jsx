import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router,Routes,Route,Navigate, BrowserRouter} from "react-router-dom";
import Login from './pages/login';
import HomePage from './pages/homepage';
import Register from './pages/register';
import Editor from './pages/editor';
import HomePageTest from './pages/homepagetest';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/homePage' element={<HomePage/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/add-recipe' element={<Editor/>}/>
          <Route path='/homeTest' element={<HomePageTest/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
