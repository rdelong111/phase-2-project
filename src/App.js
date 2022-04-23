import React, {useState, useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import NavBar from './NavBar';
import Home from './homecomponents/Home';
import Login from './Login';
import Dogs from './dogcomponents/Dogs';
import NotFound from './NotFound';

function App() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/user')
      .then((r) => r.json())
      .then((userData) => setUser(userData[0]));
  }, []);

  function handleLogin(userSub) {
    if (userSub.username === user.username && userSub.password === user.password) {
      patchUser({isLoggedIn: !user.isLoggedIn});
      navigate('/');
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
        <Route path='*' element={<NotFound />} />
        <Route 
          path='/'
          element={<Home user={user} onUserEdit={(editData) => patchUser(editData)} /> }
        />
        <Route
          path='login'
          element={<Login onLogin={handleLogin} isSignedIn={user.isLoggedIn} />}
        />
        <Route
          path='dogs/*'
          element={<Dogs isSignedIn={user.isLoggedIn} />}
        />
      </Routes>
    </div>
  )
}

export default App;
