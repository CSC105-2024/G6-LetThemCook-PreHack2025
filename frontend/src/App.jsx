import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router,Routes,Route,Navigate, BrowserRouter, createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './pages/login';
import HomePage from './pages/homepage';
import Register from './pages/register';
import Editor from './pages/editor';

import CategoryPage from "./pages/CategoryPage";
import CountryChoosePage from './pages/countryChoose';
import ScrollToTop from './services/scrollToTop';
import UserProfile from './pages/userProfile';
import OtherProfilePage from './pages/otherProfile';
import RecipeDisplay from './pages/recipeDisplay';
import ProtectedLayout from './components/protectedLayout';
import NotFoundPage from './pages/NotFound';
const router = createBrowserRouter([
  {
    path:"/",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/",
    element:<ProtectedLayout/>,
    children:[
      {path:"/homePage", element:<HomePage/>},
      {path:"/add-recipe", element:<Editor/>},
      {path:"/category/:type", element:<CategoryPage />},
      {path:"/pages/countryChoose", element:<CountryChoosePage />},
      {path:"/myProfile", element:<UserProfile/>},
      {path:"/userProfile/:id", element:<OtherProfilePage/>},
      {path:"/recipe/:id", element:<RecipeDisplay/>},
      {path:"*",element:<NotFoundPage/>}
    ]
  }
])
function App() {
  return (
    <RouterProvider router={router}/> 
    /**
     * 
     * <>
      <Router>
        <ScrollToTop/>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/homePage' element={<HomePage/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/add-recipe' element={<Editor/>}/>
          <Route path="/category/:type" element={<CategoryPage />} />
          <Route path="/pages/countryChoose" element={<CountryChoosePage />} />
          <Route path='/myProfile' element={<UserProfile/>}/>
          <Route path='/userProfile/:id'element={<OtherProfilePage/>}/> 
          <Route path='/recipe/:id' element={<RecipeDisplay />} />
        </Routes>
      </Router>
    </>
     * 
     */
    
  )
}

export default App
