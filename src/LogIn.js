import React, {useState} from 'react';
import { Navigate } from 'react-router-dom';

function Login({onLogin, isSignedIn = false}) {
  const [formData, setData] = useState({
    username: '',
    password: ''
  });

  function handleDataChange(e) {
    setData({...formData, [e.target.name]: e.target.value});
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    onLogin(formData);
    e.target.reset();
    setData({username: '', password: ''});
  }

  if (isSignedIn) return <Navigate to='/' />;
  return (
    <form onSubmit={handleLoginSubmit} id='loginform'>
      <label>
        {'Username: '}
        <input
          onChange={handleDataChange}
          name='username'
          type='text'
          placeholder='username...'
        />
      </label>
      <label><br />
        {'Password: '}
        <input
          onChange={handleDataChange}
          name='password'
          type='password'
          placeholder='password...'
        />
      </label><br />
      <button type='submit'>Log In</button>
    </form>
  )
}

export default Login;