import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';

function Login({onLogin, isSignedIn = false}) {
  const [formData, setData] = useState({
    username: '',
    password: ''
  }); // login form data is stored in state

  // changes the form data in state when user type in either input box
  function handleDataChange(e) {
    setData({...formData, [e.target.name]: e.target.value});
  }

  // calls the prop to check if login data matches the user data
  // resets the form and form data to blank
  function handleLoginSubmit(e) {
    e.preventDefault();
    onLogin(formData);
    e.target.reset();
    setData({username: '', password: ''});
  }

  if (isSignedIn) return <Navigate to='/' replace />;
  return (
    <form onSubmit={handleLoginSubmit} id='loginform' className='container'>
      <label>
        {'Username: '}
        <input
          onChange={handleDataChange}
          name='username'
          type='text'
          placeholder='username...'
        />
      </label><br />
      <label>
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