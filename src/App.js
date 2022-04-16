import React, {useState, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import NavBar from './navbars/NavBar';
import Home from './Home';
import LogIn from './LogIn';

function App() {
  const [userLogIn, changeUser] = useState(true);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route 
          path="/"
          element={<Home isSignedIn={userLogIn} /> }
        />
        <Route
          path="login"
          element={<LogIn isSignedIn={userLogIn} />}
        />
      </Routes>
    </div>
  )
}

export default App;
