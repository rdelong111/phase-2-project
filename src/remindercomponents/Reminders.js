import React, {useState, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import Reminder from './Reminder';
import ReminderForm from './ReminderForm';
import ReminderSortFilt from './ReminderSortFilt';

function Reminders({isSignedIn}) {
  const [rmdrs, changeRmdrs] = useState([]); // list of reminders stored in state
  const [form, showForm] = useState(false); // used to show new reminder form or not
  const [sort, changeSort] = useState('none'); // sort selection stored in state
  const [search, changeSearch] = useState(''); // search box text stored in state

  // creates a list of reminders based on sort selection and search text
  const rList = sortFunction(rmdrs, sort)
    .map((rmdr) => {
      if (rmdr.message.toLowerCase().includes(search.toLowerCase())) {
        return (
          <Reminder key={rmdr.id} reminder={rmdr} onRDelete={handleDelete} />
        )
      }
      else return null;
    });

  // GETs list of reminders when page loads
  useEffect(() => {
    fetch('http://localhost:3001/reminders')
      .then((r) => r.json())
      .then((theRs) => changeRmdrs(theRs));
  }, []);

  // POSTs new reminder to db.json and adds reminder to list in state. Then hides form
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

  // Deletes selected reminder in db.json and does so in state also
  function handleDelete(ID) {
    fetch(`http://localhost:3001/reminders/${ID}`, {
      method: 'DELETE'
    })
      .then(() => {
        const updatedList = rmdrs.filter((rmdr) => rmdr.id !== ID);
        changeRmdrs(updatedList);
      })
  }

  // used to sort list of reminders based on selection
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
    <section id='reminders' className='container'>
      {form ? <ReminderForm onFormSubmit={handleFormSubmit} /> : null}
      <button onClick={() => showForm(!form)}>
        {form ? 'Cancel Reminder' : 'Add Reminder'}
      </button>
      <h1>Reminders</h1>
      <ReminderSortFilt
        onSortChange={(e) => changeSort(e.target.value)}
        onSearchChange={(e) => changeSearch(e.target.value)}
      /><hr />
      <ul id='reminderlist'>
        {rList}
      </ul>
    </section>
  )
}

export default Reminders;