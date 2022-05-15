import React from 'react';
import {useParams} from 'react-router-dom';

function Dog({dogs}) {
  const {dogName} = useParams(); // gets dog name from url
  const theDog = dogs.filter((dog) => dog.name === dogName)[0]; // gets dog info on matching url name

  return (
    <div className='container mydog'>
      <figure className='dogpic'>
        <img src={theDog.image} alt={theDog.name} />
        <figcaption> Name: {theDog.name}</figcaption>
      </figure>
      <p>Breed: {theDog.breed}</p>
      <p>Color: {theDog.color}</p>
      <p>Weight: {theDog.weight}</p>
    </div>
  )
}

export default Dog;