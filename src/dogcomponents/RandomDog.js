import React, {useState, useEffect} from 'react';

function RandomDog({onSetProfilePic}) {
  const [dog, changeDog] = useState('https://www.pngitem.com/pimgs/m/495-4957447_dog-spots-on-back-outline-stamp-stick-figure.png');

  useEffect(() => {fetchDog()}, [])

  function fetchDog() {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((r) => r.json())
      .then((theDog) => changeDog(theDog.message));
  }

  function handleSetProfilePic() {
    onSetProfilePic(dog);
  }

  return (
    <div className='dogcard'>
      <p>
        {'Would you like to make this dog your profile picture? '}
        <button onClick={handleSetProfilePic}>Set Profile Picture</button>
      </p>
      <img id='randomdog' src={dog} alt='random dog' /><br />
      <button onClick={() => fetchDog()}>New Dog</button>
    </div>
  )
}

export default RandomDog;