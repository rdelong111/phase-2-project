import React, {useState, useEffect} from 'react';
import {Route, Routes, NavLink, Navigate} from 'react-router-dom';
import DogsHome from './DogsHome';
import Dog from './Dog';
import RandomDog from './RandomDog';

function Dogs({isSignedIn, onSetProfilePic}) {
  const [dogs, changeDogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/dogs')
      .then((r) => r.json())
      .then((theDogs) => changeDogs(theDogs))
  }, []);

  const dogNav = dogs.map((dog) => (
    <NavLink
      key={dog.id}
      to={dog.name}
      className={({isActive}) => (isActive ? 'active': 'inactive')}
    >{dog.name}</NavLink>
  ));

  if (!isSignedIn) return <Navigate to='/login' replace />;
  return (
    <>
      {dogNav}
      <NavLink
        to='random'
        className={({isActive}) => (isActive ? 'active': 'inactive')}
      >Random</NavLink>
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