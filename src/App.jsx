import { useState, useEffect } from 'react'
import AppContext from './context/AppContext'
import Header from './routes/Header';
import Home from './routes/Home';
import Login from './routes/Users/Login'
import Signup from './routes/Users/Signup'
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HappyHours from './routes/HappyHours';
import Favorites from './routes/Favorites';
import './App.css'
import UserPool from './AWS/UserPool';

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
          <Header user = {user}/>
            <Routes>
              <Route name='home' path = '/' element = {<Home />}/>
              {/* <Route name='happyhours' path = '/happyhours' element = {<HappyHours />}/> */}
              <Route name='favorites' path = '/favorites' element = {<Favorites />}/>
              <Route name='signup' path = '/signup' element = {<Signup />}/>
              <Route name='login' path = '/login' element = {<Login />}/>
            </Routes>
          </Router>
        </AppContext.Provider>
    </>
  )
}


export default App;
