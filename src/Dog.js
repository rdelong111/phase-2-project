import React from 'react';
import {useParams} from 'react-router-dom';

function Dog({dogs}) {
  const params = useParams();
  const theDog = dogs.filter((dog) => dog.name === params.dogName)[0];

  return (
    <div key={theDog.id} className='dogcard'>
      <figure className='dogpic'>
        <img src={theDog.image} alt={theDog.name} />
        <figcaption>{theDog.name}</figcaption>
      </figure>
      <p>Breed: {theDog.breed}</p>
      <p>Color: {theDog.color}</p>
      <p>Weight: {theDog.weight}</p>
    </div>
  )
}

export default Dog;