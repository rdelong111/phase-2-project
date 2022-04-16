import React from 'react';
import {Navigate} from 'react-router-dom';

function Home({isSignedIn}) {
  if (!isSignedIn) return <Navigate to='/login' />;
  return <h1>{`Hello is logged in`}</h1>
}

export default Home;