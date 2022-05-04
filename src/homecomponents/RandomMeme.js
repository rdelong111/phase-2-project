import React, {useState} from 'react';

function RandomMeme({onSetProfilePic}) {
  const [meme, changeMeme] = useState({
    author: 'internet',
    postLink: 'https://youtu.be/dQw4w9WgXcQ',
    subreddit: 'N/A',
    title: 'Stock Image',
    url: 'https://i.stack.imgur.com/34AD2.jpg'
  });

  function handleNewMeme() {
    fetch('https://meme-api.herokuapp.com/gimme')
      .then((r) => r.json())
      .then((theMeme) => {
        if (theMeme.nsfw || theMeme.spoiler) return handleNewMeme();
        else {
          changeMeme({
            author: theMeme.author,
            postLink: theMeme.postLink,
            subreddit: theMeme.subreddit,
            title: theMeme.title,
            url: theMeme.url
          });
        }
      });
  }

  return (
    <section id='memesec' className='container'>
      <h2>
        {'Press '}
        <button onClick={handleNewMeme}>Meme</button>
        {' for new meme.'}
      </h2>
      <p>{'Would you like this image to be your profile picture? '}
        <button onClick={() => onSetProfilePic(meme.url)}>Set Profile Picture</button>
      </p>
      <figure>
        <img src={meme.url} alt={meme.title} />
        <figcaption>{meme.title}</figcaption>
      </figure>
      <article>
        <h2>Author: {meme.author}</h2>
        <p>
          {`subreddit: ${meme.subreddit} - `}
          <a href={meme.postLink}>LINK</a>
        </p>
      </article>
    </section>
  )
}

export default RandomMeme;