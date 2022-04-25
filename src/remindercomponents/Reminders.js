import React from 'react';
import {Navigate} from 'react-router-dom';

function Reminders({isSignedIn}) {
  if (!isSignedIn) return <Navigate to='/login' replace />;
  return (
    <h1>reminders</h1>
  )
}

export default Reminders;