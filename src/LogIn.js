import React from 'react';
import { Navigate } from 'react-router-dom';

function LogIn({isSignedIn}) {
  if (isSignedIn) return <Navigate to='/' />;
  return (
    <h1>TEST</h1>
  )
}

export default LogIn;