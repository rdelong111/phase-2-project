import React, {useState, useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import NavBar from "./NavBar";
import Home from './Home';
import About from './About';

function App() {
  const [isLoaded, setLoaded] = useState(false);
  const [loginInfo, setLoginInfo] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/logininfo')
      .then((r) => r.json())
      .then((loginData) => {
        setLoaded(true);
        setLoginInfo(loginData[0]);
      })
  }, []);

  if (!isLoaded) return <h1>Loading...</h1>;
  return (
    <div>
      <NavBar />
      <Routes>
        <Route 
          path="/"
          element={<Home user={loginInfo.username} /> }
        />
        <Route
          path="about/*"
          element={<About />}
        />
      </Routes>
    </div>
  )
}

export default App;
