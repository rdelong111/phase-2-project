import React, {useState, useEffect} from 'react';
import {Navigate, Route, Routes, NavLink} from 'react-router-dom';
import Dog from './Dog';

function Dogs({isSignedIn}) {
  const [dogs, changeDogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/dogs')
      .then((r) => r.json())
      .then((theDogs) => changeDogs(theDogs))
  }, []);

  const dogNav = dogs.map((dog) => (
    <NavLink key={dog.id} to={dog.name}>{dog.name}</NavLink>
  ));

  if (!isSignedIn) return <Navigate to='/login' />;
  return (
    <div id='dogcontainer'>
      {dogNav}
      <Routes>
        <Route path=':dogName' element={<Dog dogs={dogs} />} />
      </Routes>
    </div>
  )
}

export default Dogs;