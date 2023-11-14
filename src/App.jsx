import { useState } from 'react'
import Header from './routes/Header';
import Home from './routes/Home';
import SignIn from './routes/SignIn';
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
            <Route name='happyhours' path = '/happyhours' element = {<HappyHours />}/>
            <Route name='favorites' path = '/favorites' element = {<Favorites />}/>
            <Route name='signin' path = '/signin' element = {<SignIn />}/>
          </Routes>
        </Router>
    </>
  )
}

export default App
