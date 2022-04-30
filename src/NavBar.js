import React from 'react';
import {NavLink} from 'react-router-dom';

function NavBar({isLoggedIn, onLogout}) {
  const logoutbtn = (
    <button onClick={onLogout}>Logout</button>
  )

  return (
    <div>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='dogs'>Dogs</NavLink>
      <NavLink to='reminders'>Reminders</NavLink>
      {isLoggedIn ? logoutbtn : null}
    </div>
  )
}

export default NavBar;