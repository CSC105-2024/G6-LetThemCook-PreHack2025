import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router,Routes,Route,Navigate, BrowserRouter} from "react-router-dom";
import Login from './pages/login';
import HomePage from './pages/homepage';
import CategoryPage from "./pages/CategoryPage";
import CountryChoosePage from './pages/countryChoose';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/homePage' element={<HomePage/>}/>
          <Route path="/category/:type" element={<CategoryPage />} />
          <Route path="/pages/countryChoose" element={<CountryChoosePage />} />
         
        </Routes>
      </Router>
    </>
  )
}

export default App
