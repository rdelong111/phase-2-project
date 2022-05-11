import React, {useState} from 'react';

function ReminderForm({onFormSubmit}) {
  const [formData, changeData] = useState({
    message: '',
    priority: 3
  });

  function handleFormChange(e) {
    changeData({
      ...formData,
      [e.target.name]: e.target.name === 'message' ? e.target.value : parseInt(e.target.value)
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    onFormSubmit(formData);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        {'Reminder: '}
        <input onChange={handleFormChange} type='text' name='message' placeholder='reminder...' />
      </label>
      <label>
        {' Set Priority: '}
        <select onChange={handleFormChange} name='priority'>
          <option value='3'>Low</option>
          <option value='2'>Medium</option>
          <option value='1'>High</option>
        </select>
      </label>
      <button type='submit'>Submit Reminder</button>
    </form>
  )
}

export default ReminderForm;