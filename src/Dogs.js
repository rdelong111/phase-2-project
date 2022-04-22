import React, {useState, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import Dog from './Dog';

function Dogs({isSignedIn}) {
  const [dogs, changeDogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/dogs')
      .then((r) => r.json())
      .then((theDogs) => changeDogs(theDogs))
  }, []);

  const dogList = dogs.map((dog) => (
    <Dog key={dog.id} dog={dog} />
  ));

  if (!isSignedIn) return <Navigate to='/login' />;
  return (
    <div id='dogcontainer'>
      {dogList}
    </div>
  )
}

export default Dogs;