import React, {useState, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import NavBar from './navbars/NavBar';
import Home from './Home';
import Login from './Login';

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/user')
      .then((r) => r.json())
      .then((userData) => setUser(userData[0]));
  }, []);

  function handleLogin(userSub) {
    if (userSub.username === user.username && userSub.password === user.password) {
      loginlogout(user.id);
    }
  }

  function loginlogout(ID) {
    fetch(`http://localhost:3001/user/${ID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({isLoggedIn: !user.isLoggedIn})
    })
      .then((r) => r.json())
      .then((updatedUser) => setUser(updatedUser));
  }

  return (
    <div>
      <NavBar isLoggedIn={user.isLoggedIn} onLogout={() => loginlogout(user.id)} />
      <Routes>
        <Route 
          path="/"
          element={<Home user={user} /> }
        />
        <Route
          path="login"
          element={<Login onLogin={handleLogin} isSignedIn={user.isLoggedIn} />}
        />
      </Routes>
    </div>
  )
}

export default App;
