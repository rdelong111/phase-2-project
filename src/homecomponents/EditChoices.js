import React from 'react';

function EditChoices({onFormShow, onChoiceChange}) {
  return (
    <label>
      {'Edit: '}
      <select name='editoptions' onChange={onChoiceChange}>
        <option value='firstname'>First Name</option>
        <option value='lastname'>Last Name</option>
        <option value='username'>Username</option>
        <option value='password'>Password</option>
        <option value='picture'>Profile Picture</option>
      </select>
      {' '}<button onClick={onFormShow}>Edit</button>
    </label>
  )
}

export default EditChoices;