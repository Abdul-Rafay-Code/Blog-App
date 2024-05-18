import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import './App.css'
import Home from './Pages/home/Home'
import BlogInfo from './Pages/blogInfo/BlogInfo'
import AllBlog from './Pages/allblog/AllBlog'
import CreateBlog from './Pages/admin/createblog/CreateBlog'
import DashBoard from './Pages/admin/dashboard/DashBoard'
import AdminLogin from './Pages/admin/adminlogin/AdminLogin'
import NoPage from './Pages/nopage/NoPage'
import MyState from './context/data/MyState'
import { Toaster } from 'react-hot-toast';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <MyState>
    <Router>
      <Routes>
        <Route  path='/' element={<Home/>} />
        <Route  path='/BlogInfo/:id' element={<BlogInfo/>} />
        <Route  path='/AllBlog' element={<AllBlog/>} />
        <Route  path='/CreateBlog' element={
                        <ProtectedRoute>
                        <CreateBlog/>
                        </ProtectedRoute>
        } />
        <Route  path='/DashBoard' element={
                  <ProtectedRoute>
                        <DashBoard/>
                        </ProtectedRoute>
        } />
        <Route  path='/AdminLogin' element={<AdminLogin/>} />
        <Route  path='/*' element={<NoPage/>} />
      </Routes>
      <Toaster/>
    </Router>
    </MyState>
         </>
  )
}

export default App

export const  ProtectedRoute = ({children})=>{
  const user = JSON.parse(localStorage.getItem('user'))
  if(user?.user?.email === 'test@gmail.com'){
    return children
  }

  else{
    return <Navigate to={'/AdminLogin'} />
  }

}