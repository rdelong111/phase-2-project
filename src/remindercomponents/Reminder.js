import React from 'react';

function Reminder({reminder, onRDelete}) {
  function thePriority(num) {
    if (num === 3) return 'Low';
    else if (num === 2) return 'Medium';
    else return 'High';
  }

  return (
    <li>
      {reminder.message}<br />
      {`Priority: ${thePriority(reminder.priority)}`}<br />
      <button onClick={() => onRDelete(reminder.id)}>Delete</button><br /><br />
    </li>
  )
}

export default Reminder;