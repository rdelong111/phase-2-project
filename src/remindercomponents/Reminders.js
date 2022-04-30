import React, {useState, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import Reminder from './Reminder';
import ReminderForm from './ReminderForm';
import ReminderSortFilt from './ReminderSortFilt';

function Reminders({isSignedIn}) {
  const [rmdrs, changeRmdrs] = useState([]);
  const [form, showForm] = useState(false);
  const [sort, changeSort] = useState('none');

  const rList = sortFunction(rmdrs, sort)
    .map((rmdr) => (
      <Reminder key={rmdr.id} reminder={rmdr} onRDelete={handleDelete} />
    ));

  useEffect(() => {
    fetch('http://localhost:3001/reminders')
      .then((r) => r.json())
      .then((theRs) => changeRmdrs(theRs));
  }, []);

  function handleFormSubmit(reminder) {
    fetch('http://localhost:3001/reminders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reminder)
    })
      .then((r) => r.json())
      .then((newRmdr) => {
        changeRmdrs([...rmdrs, newRmdr]);
        showForm(!form);
      });
  }

  function handleDelete(ID) {
    fetch(`http://localhost:3001/reminders/${ID}`, {
      method: 'DELETE'
    })
      .then(() => {
        const updatedList = rmdrs.filter((rmdr) => rmdr.id !== ID);
        changeRmdrs(updatedList);
      })
  }

  function sortFunction(reminders, sortVal) {
    if (sortVal === 'none') return reminders;
    else if (sortVal === 'alpha') {
      return reminders.sort((a, b) => {
        if (a.message.toLowerCase() < b.message.toLowerCase()) return -1;
        if (a.message.toLowerCase() < b.message.toLowerCase()) return 1;
        return 0;
      });
    }
    else {
      return reminders.sort((a, b) => {
        if (a.priority < b.priority) {
          return sortVal === 'LtoH' ? 1 : -1;
        }
        if (a.priority > b.priority) {
          return sortVal === 'LtoH' ? -1 : 1;
        }
        return 0;
      });
    }
  }

  if (!isSignedIn) return <Navigate to='/login' replace />;
  return (
    <section>
      {form ? <ReminderForm onFormSubmit={handleFormSubmit} /> : null}
      <button onClick={() => showForm(!form)}>
        {form ? 'Cancel Reminder' : 'Add Reminder'}
      </button>
      <h1>Reminders</h1>
      <ReminderSortFilt onSortChange={(e) => changeSort(e.target.value)} />
      <ul id='reminderlist'>
        {rList}
      </ul>
    </section>
  )
}

export default Reminders;