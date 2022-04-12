import React, {useState, useEffect} from 'react';
import {Route, Switch} from "react-router-dom";
import NavBar from "./NavBar";
import Home from './Home';
import About from './About';

function App() {
  const [isLoaded, setLoaded] = useState(false);
  const [loginInfo, setLoginInfo] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/logininfo')
      .then((r) => r.json())
      .then((loginData) => {
        setLoaded(true);
        setLoginInfo(loginData);
      })
  }, []);

  if (!isLoaded) return <h1>Loading...</h1>;
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home user={loginInfo[0].username} />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
