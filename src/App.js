import React, {useState, useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import NavBar from './NavBar';
import Home from './homecomponents/Home';
import Login from './Login';
import Dogs from './dogcomponents/Dogs';
import Reminders from './remindercomponents/Reminders';
import NotFound from './NotFound';

function App() {
  const [user, setUser] = useState({}); // user data
  const navigate = useNavigate(); // used for during logout or login

  // GETs the user data
  useEffect(() => {
    fetch('http://localhost:3001/user')
      .then((r) => r.json())
      .then((userData) => setUser(userData[0]));
  }, []);

  // checks if entered login data matches the user data and then navigates to home component
  function handleLogin(userSub) {
    if (userSub.username === user.username && userSub.password === user.password) {
      patchUser({isLoggedIn: !user.isLoggedIn});
      navigate('/', {replace: true});
    }
  }

  // patches user data login status to false and navigates to login component
  function handleLogout() {
    patchUser({isLoggedIn: !user.isLoggedIn});
    navigate('login', {replace: true});
  }

  // function that PATCHes db.json user
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
      <NavBar isLoggedIn={user.isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route 
          path='/'
          element={<Home 
                    user={user}
                    onUserEdit={(editData) => patchUser(editData)}
                    onSetProfilePic={(pic) => patchUser({...user, picture: pic})} />
                  }
        />
        <Route
          path='login'
          element={<Login onLogin={handleLogin} isSignedIn={user.isLoggedIn} />}
        />
        <Route
          path='dogs/*'
          element={<Dogs 
                    isSignedIn={user.isLoggedIn}
                    onSetProfilePic={(pic) => patchUser({...user, picture: pic})} />
                  }
        />
        <Route
          path='reminders'
          element={<Reminders
                    isSignedIn={user.isLoggedIn} />
                  }
        />
      </Routes>
    </div>
  )
}

export default App;
