import React from 'react';

function ReminderSortFilt({onSortChange}) {
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
    </div>
  )
}

export default ReminderSortFilt;