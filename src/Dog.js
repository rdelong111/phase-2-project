import React from 'react';

function Dog({dog}) {
  return (
    <div className='dogcard'>
      <figure className='dogpic'>
        <img src={dog.image} alt={dog.name} />
        <figcaption>{dog.name}</figcaption>
      </figure>
      <p>Breed: {dog.breed}</p>
      <p>Color: {dog.color}</p>
      <p>Weight: {dog.weight}</p>
    </div>
  )
}

export default Dog;