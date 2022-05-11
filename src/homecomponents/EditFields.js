import React from 'react';

function EditFields({onEditSubmit, onEditFormChange, onFormShow, edit}) {
  return (
    <>
      <form onSubmit={onEditSubmit}>
        <label>
          {`New ${edit}: `}
          <input
            type={edit === 'password' ? 'password' : 'text'}
            name='new'
            placeholder={`${edit}...`}
            onChange={onEditFormChange}
          />
        </label>
        <label>
          {` Confirm new ${edit}: `}
          <input
            type={edit === 'password' ? 'password' : 'text'}
            name='confirm'
            placeholder={`${edit}...`}
            onChange={onEditFormChange}
          />
        </label>
        {' '}<button type='submit'>Submit Change</button>
      </form>
      <button onClick={onFormShow}>Cancel Edit</button>
    </>
  );
}

export default EditFields;