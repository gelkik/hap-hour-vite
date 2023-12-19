import { useState, useEffect } from 'react'
import AppContext from './context/AppContext'
import Header from './routes/Header';
import Home from './routes/Home';
import Login from './routes/Users/Login'
import Signup from './routes/Users/Signup'
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HappyHour from './routes/HappyHour';
import Favorites from './routes/Favorites';
import './App.css'

function App() {

  // const navigate = useNavigate();

    // const user = UserPool.getCurrentUser();
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  
  return (
    <>
       <AppContext.Provider
          value={{ user, setUser, accessToken, setAccessToken }}>
        <Router>
          <Header />
            <Routes>
              <Route name='home' path = '/' element = {<Home />}/>
              <Route name='favorites' path = '/favorites' element = {<Favorites />}/>
              <Route name='signup' path = '/signup' element = {<Signup />}/>
              <Route name='login' path = '/login' element = {<Login />}/>
              <Route name='happyhour' path = '/happyhour' element = {<HappyHour />}/>
            </Routes>
          </Router>
        </AppContext.Provider>
    </>
  )
}


export default App;
