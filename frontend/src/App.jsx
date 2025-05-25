import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router,Routes,Route,Navigate, BrowserRouter} from "react-router-dom";
import Login from './pages/login';
import HomePage from './pages/homepage';
import UserProfile from './pages/userProfile';
import OtherProfilePage from './pages/otherProfile';
import RecipeDisplay from './pages/recipeDisplay';
import Register from './pages/register';
import fakeRecipe from './components/fakeRecipe'
import Editor from './pages/editor'


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/homePage' element={<HomePage/>}/>
          <Route path='/myProfile' element={<UserProfile/>}/>
          <Route path='/userProfile'element={<OtherProfilePage/>}/> 
          <Route path='/recipe' element={<RecipeDisplay recipe={fakeRecipe} />} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/add-recipe' element={<Editor/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
