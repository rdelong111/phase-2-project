import React from 'react';
import {Route, Switch} from "react-router-dom";
import NavBar from "./NavBar";
import Home from './Home';
import About from './About';

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
