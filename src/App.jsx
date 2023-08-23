import { useState } from 'react'
import Header from './routes/Header';
import Home from './routes/Home';
import SignIn from './routes/SignIn';
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import HappyHours from './routes/HappyHours';
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      
        <Router>
        <Header />
          <Routes>
            <Route name='home' path = '/' element = {<Home />}/>
            <Route name='signin' path = '/signin' element = {<SignIn />}/>
            <Route name='happyhours' path = '/happyhours' element = {<HappyHours />}/>
          </Routes>
        </Router>
    </>
  )
}

export default App
