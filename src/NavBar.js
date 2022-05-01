import React from 'react';
import {NavLink} from 'react-router-dom';

function NavBar({isLoggedIn, onLogout}) {
  const logoutbtn = (
    <button id='logout' onClick={onLogout}>Logout</button>
  )

  return (
    <div>
      <NavLink
        to='/'
        className={({isActive}) => (isActive ? 'active': 'inactive')}
      >Home</NavLink>
      <NavLink
        to='dogs'
        className={({isActive}) => (isActive ? 'active': 'inactive')}
      >Dogs</NavLink>
      <NavLink
        to='reminders'
        className={({isActive}) => (isActive ? 'active': 'inactive')}
      >Reminders</NavLink>
      {isLoggedIn ? logoutbtn : null}
    </div>
  )
}

export default NavBar;