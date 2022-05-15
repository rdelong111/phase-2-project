import React, {useState, useEffect} from 'react';

function RandomDog({onSetProfilePic}) {
  // stores dog in state
  const [dog, changeDog] = useState('https://www.pngitem.com/pimgs/m/495-4957447_dog-spots-on-back-outline-stamp-stick-figure.png');

  useEffect(() => {fetchDog()}, []); // GETs a dog when page loads

  // function that GETs a dog when called
  function fetchDog() {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((r) => r.json())
      .then((theDog) => changeDog(theDog.message));
  }

  // calls a prop when the profile pic button is clicked
  function handleSetProfilePic() {
    onSetProfilePic(dog);
  }

  return (
    <div id='randomdog' className='container'>
      <p>
        {'Would you like to make this dog your profile picture? '}
        <button onClick={handleSetProfilePic}>Set Profile Picture</button>
      </p>
      <img src={dog} alt='random dog' /><br />
      <button onClick={() => fetchDog()}>New Dog</button>
    </div>
  )
}

export default RandomDog;