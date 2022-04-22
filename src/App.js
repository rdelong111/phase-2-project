import React, {useState, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import NavBar from './navbars/NavBar';
import Home from './Home';
import Login from './Login';
import Dogs from './Dogs';

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/user')
      .then((r) => r.json())
      .then((userData) => setUser(userData[0]));
  }, []);

  function handleLogin(userSub) {
    if (userSub.username === user.username && userSub.password === user.password) {
      patchUser({isLoggedIn: !user.isLoggedIn});
    }
  }

  function patchUser(data, ID = 1) {
    fetch(`http://localhost:3001/user/${ID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((r) => r.json())
      .then((updatedUser) => setUser(updatedUser));
  }

  return (
    <div>
      <NavBar isLoggedIn={user.isLoggedIn} onLogout={() => patchUser({isLoggedIn: !user.isLoggedIn})} />
      <Routes>
        <Route 
          path='/'
          element={<Home user={user} onUserEdit={(editData) => patchUser(editData)} /> }
        />
        <Route
          path='login'
          element={<Login onLogin={handleLogin} isSignedIn={user.isLoggedIn} />}
        />
        <Route
          path='dogs'
          element={<Dogs isSignedIn={user.isLoggedIn} />}
        />
      </Routes>
    </div>
  )
}

export default App;
