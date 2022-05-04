import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';
import EditFields from './EditFields';
import EditChoices from './EditChoices';
import RandomMeme from './/RandomMeme';

function Home({user, onUserEdit, onSetProfilePic}) {
  const [edit, changeEdit] = useState('firstname');
  const [showForm, changeShow] = useState(false);
  const [editForm, changeEditForm] = useState({new: '', confirm: ''});

  function handleEditSubmit(e) {
    e.preventDefault();
    if (editForm.new === editForm.confirm) {
      onUserEdit({[edit]: editForm.new});
      changeEdit('firstname');
      changeShow(false);
    }
    else {
      changeEditForm({new: '', confirm: ''});
      e.target.reset();
      alert('Your new input does not match your confirmed input. Try again.');
    }
  }

  function handleShowForm() {
    if (showForm) {
      changeEdit('firstname');
    }
    else {
      changeEditForm({new: '', confirm: ''});
    }
    changeShow(!showForm);
  }

  function handleEditFormChange(e) {
    changeEditForm({...editForm, [e.target.name]: e.target.value});
  }

  if (!user.isLoggedIn) return <Navigate to='/login' replace />
  return (
    <>
      <section id='usersec'>
        <h2>{user.username}</h2>
        <figure>
          <img src={user.picture} alt='ryan' />
          <figcaption>{user.firstname} {user.lastname}</figcaption>
        </figure>
        <div>
          {showForm ? 
            <EditFields
              onEditSubmit={handleEditSubmit}
              onEditFormChange={handleEditFormChange}
              onFormShow={handleShowForm}
              edit={edit}
            />
            : 
            <EditChoices
              onFormShow={handleShowForm}
              onChoiceChange={(e) => changeEdit(e.target.value)}
            />
          }
        </div>
      </section>
      <hr />
      <RandomMeme onSetProfilePic={onSetProfilePic} />
    </>
  )
}

export default Home;