import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';

function Home({user, onUserEdit}) {
  const [edit, changeEdit] = useState('firstname');
  const [showForm, changeShow] = useState(false);
  const [editForm, changeEditForm] = useState({new: '', confirm: ''});

  const editFields = (
    <>
      <form onSubmit={handleEditSubmit}>
        <label>
          {`New ${edit}: `}
          <input
            type={edit === 'password' ? 'password' : 'text'}
            name='new'
            placeholder={`${edit}...`}
            onChange={(e) => changeEditForm({...editForm, new: e.target.value})}
          />
        </label>
        <label>
          {` Confirm new ${edit}: `}
          <input
            type={edit === 'password' ? 'password' : 'text'}
            name='confirm'
            placeholder={`${edit}...`}
            onChange={(e) => changeEditForm({...editForm, confirm: e.target.value})}
          />
        </label>
        <button type='submit'>Submit Change</button>
      </form>
      <button onClick={() => changeShow(false)}>Cancel Edit</button>
    </>
  );

  const editChoices = (
    <label>
      {'Edit: '}
      <select name='editoptions' onChange={(e) => changeEdit(e.target.value)}>
        <option value='firstname'>First Name</option>
        <option value='lastname'>Last Name</option>
        <option value='username'>Username</option>
        <option value='password'>Password</option>
        <option value='picture'>Profile Picture</option>
      </select>
      <button onClick={handleShowForm}>Edit</button>
    </label>
  )

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
    changeShow(true);
    changeEditForm({new: '', confirm: ''});
  }

  if (!user.isLoggedIn) return <Navigate to='/login' />;
  return (
    <div>
      <figure>
        <img src={user.picture} alt='ryan' />
        <figcaption>{user.firstname} {user.lastname}</figcaption>
      </figure>
      <div>
        {showForm ? editFields : editChoices}
      </div>
    </div>
  )
}

export default Home;