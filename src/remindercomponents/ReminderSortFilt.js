import React from 'react';

function ReminderSortFilt({onSortChange, onSearchChange}) {
  return (
    <div>
      <label>
        {'Sort: '}
        <select onChange={onSortChange}>
          <option value='none'>None</option>
          <option value='LtoH'>L to H Priority</option>
          <option value='HtoL'>H to L Priority</option>
          <option value='alpha'>Alphabetically</option>
        </select>
      </label>
      <label>
        {' Search Reminder: '}
        <input onChange={onSearchChange} type='text' placeholder='reminder...'/>
      </label>
    </div>
  )
}

export default ReminderSortFilt;