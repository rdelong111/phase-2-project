import React from 'react';
import {Navigate} from 'react-router-dom';

function Home({user}) {
  if (!user.isLoggedIn) return <Navigate to='/login' />;
  return <h1>{`${user.firstname} ${user.lastname} is logged in`}</h1>
}

export default Home;