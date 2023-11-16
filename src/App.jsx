import { useState } from 'react'
import Header from './routes/Header';
import Home from './routes/Home';
import Login from './routes/Users/Login'
import Signup from './routes/Users/Signup'
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import HappyHours from './routes/HappyHours';
import Favorites from './routes/Favorites';
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      
        <Router>
        <Header />
          <Routes>
            <Route name='home' path = '/' element = {<Home />}/>
            {/* <Route name='happyhours' path = '/happyhours' element = {<HappyHours />}/> */}
            <Route name='favorites' path = '/favorites' element = {<Favorites />}/>
            <Route name='signup' path = '/signup' element = {<Signup />}/>
            <Route name='login' path = '/login' element = {<Login />}/>
          </Routes>
        </Router>
    </>
  )
}

export default App
