import React, { useState } from 'react';
import './App.css';

const EventTable = ({ events, handleShowEventClick, handleJoinEventClick, eventsToShowDetails }) => (
  <table>
    <thead>
      <tr>
        <th>Tapahtuma</th>
        <th>Paikka</th>
        <th>Aika</th>
      </tr>
    </thead>
    <tbody>
      <Events events={events} handleShowEventClick={handleShowEventClick} handleJoinEventClick={handleJoinEventClick} eventsToShowDetails={eventsToShowDetails} />
    </tbody>
  </table>
)

const Events = ({ events, handleShowEventClick, handleJoinEventClick, eventsToShowDetails }) => {
  return (
    events.map(event => <Event key={event.id} event={event} handleShowEventClick={() => handleShowEventClick(event.id)} handleJoinEventClick={() => handleJoinEventClick(event.id)} eventsToShowDetails={eventsToShowDetails} />)
  )
}

const Event = ({ event, handleShowEventClick, handleJoinEventClick, eventsToShowDetails }) => {
  if (eventsToShowDetails.includes(event.id)) {
    return (
      <tr>
        <td colSpan="3">
          <h2 className='details-header' onClick={handleShowEventClick}>{event.name}</h2>
          <h3>Paikka</h3>
          <p>{event.location}</p>
          <h3>Aika</h3>
          <p>{event.time.toLocaleString()}</p>
          <h3>Kuvaus</h3>
          <p>{event.description}</p>
          <h3>Osallistujat</h3>
          <p>{event.participants}</p>
          <button onClick={handleJoinEventClick}>Osallistu</button>
        </td>
      </tr>
    )
  } else {
    return (
      <tr onClick={handleShowEventClick}>
        <td>{event.name}</td>
        <td>{event.location}</td>
        <td>{event.time.toLocaleDateString()}</td>
      </tr>
    )
  }
}

const EventForm = ({ handleEventSubmit, newName, setNewName, newLocation, setNewLocation, newTime, setNewTime, newDescription, setNewDescription, }) => {
  return (
    <form onSubmit={handleEventSubmit}>
      <fieldset>
        <legend>Uusi tapahtuma</legend>
        <label>
          Tapahtuman nimi:
        <input value={newName} onChange={event => setNewName(event.target.value)} />
        </label>
        <label>
          Paikka:
        <input value={newLocation} onChange={event => setNewLocation(event.target.value)} />
        </label>
        <label>
          Aika:
        <input type="datetime-local" value={newTime} onChange={event => setNewTime(event.target.value)} />
        </label>
        <label>
          Kuvaus:<br />
          <textarea value={newDescription} onChange={event => setNewDescription(event.target.value)} /><br />
        </label>
        <button type='submit'>Lähetä</button>
      </fieldset>
    </form>
  )
}

function App() {
  const LocalEvents = [
    {
      id: 1,
      name: 'Konsertti 1',
      location: 'Oulu',
      time: new Date('1995-12-18T03:24:00'),
      description: 'laulua',
      participants: 1234,
      createdTime: new Date('1994-11-18T03:24:00')
    },
    {
      id: 2,
      name: 'Konsertti 2',
      location: 'Vaasa',
      time: new Date('1995-12-19T03:24:00'),
      description: 'musiikkia',
      participants: 285,
      createdTime: new Date('1994-11-19T03:24:00')
    },
    {
      id: 3,
      name: 'Kävely',
      location: 'kuu',
      time: new Date('1995-12-20T03:24:00'),
      description: 'ei ilmaa',
      participants: 3,
      createdTime: new Date('1994-11-20T03:24:00')
    }
  ]
  const [newName, setNewName] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newTime, setNewTime] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [eventsToShowDetails, setEventsToShowDetails] = useState([])
  const [events, setEvents] = useState(LocalEvents)

  const handleShowEventClick = (idShow) => {
    console.log('handleShowEventClick event', idShow)
    if (eventsToShowDetails.includes(idShow)) {
      setEventsToShowDetails(eventsToShowDetails.filter((id) => id !== idShow))
    } else {
      setEventsToShowDetails(eventsToShowDetails.concat(idShow))
    }
  }

  const handleJoinEventClick = (idJoin) => {
    console.log('handleJoinEventClick event', idJoin)
    setEvents(events
      .map(event => {
        if (idJoin === event.id) {
          let copy = { ...event }
          ++copy.participants
          return copy
        } else {
          return event
        }
      })
    )
  }

  const handleEventSubmit = (event) => {
    event.preventDefault()
    const newEvent = {
      id: events.length + 1,
      name: newName,
      location: newLocation,
      time: new Date(newTime),
      description: newDescription,
      participants: 0,
      createdTime: new Date()
    }
    setEvents(events.concat(newEvent))
  }

  return (
    <div className="App">
      <h1>Ilmoitustaulu</h1>
      <EventTable events={events} handleShowEventClick={handleShowEventClick} handleJoinEventClick={handleJoinEventClick} eventsToShowDetails={eventsToShowDetails} />
      <EventForm handleEventSubmit={handleEventSubmit} newName={newName} setNewName={setNewName} newLocation={newLocation} setNewLocation={setNewLocation}
        newTime={newTime} setNewTime={setNewTime} newDescription={newDescription} setNewDescription={setNewDescription} />
    </div>
  )
}

export default App;
