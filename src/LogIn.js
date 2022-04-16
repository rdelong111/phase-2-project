import React, {useState} from 'react';
import { Navigate } from 'react-router-dom';

function LogIn({isSignedIn}) {
  const [formData, setData] = useState({
    username: '',
    password: ''
  });

  console.log(formData)

  function handleDataChange(e) {
    setData({...formData, [e.target.name]: e.target.value});
  }

  if (isSignedIn) return <Navigate to='/' />;
  return (
    <form id='loginform'>
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
          type='text'
          placeholder='password...'
        />
      </label><br />
      <button type='submit'>Log In</button>
    </form>
  )
}

export default LogIn;