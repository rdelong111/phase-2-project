import React, {useState, useEffect} from 'react';
import {Route, Routes, NavLink, Navigate} from 'react-router-dom';
import DogsHome from './DogsHome';
import Dog from './Dog';
import RandomDog from './RandomDog';

function Dogs({isSignedIn, onSetProfilePic}) {
  const [dogs, changeDogs] = useState([]); // dog list stored in state

  // GETs list of dogs
  useEffect(() => {
    fetch('http://localhost:3001/dogs')
      .then((r) => r.json())
      .then((theDogs) => changeDogs(theDogs))
  }, []);

  // creates a navigation bar based on the list of dogs
  const dogNav = dogs.map((dog) => (
    <NavLink
      key={dog.id}
      to={dog.name}
      className={({isActive}) => (isActive ? 'active': 'inactive')}
    >{dog.name}</NavLink>
  ));

  if (!isSignedIn) return <Navigate to='/login' replace />; // makes sure if user is logged in
  return (
    <>
      <div className='navsection'>
        {dogNav}
        <NavLink
          to='random'
          className={({isActive}) => (isActive ? 'active': 'inactive')}
        >Random</NavLink>
      </div>
      <div id='dogcontainer'>
        <Routes>
          <Route index element={<DogsHome />} />
          <Route path=':dogName' element={<Dog dogs={dogs} />} />
          <Route path='random' element={<RandomDog onSetProfilePic={onSetProfilePic} />} />
        </Routes>
      </div>
    </>
  )
}

export default Dogs;