import React, { useState } from 'react';
import './App.css';

const EventTable = ({ events, handleShowEventClick, eventsToShowDetails }) => (
  <table>
    <thead>
      <tr>
        <th>Tapahtuma</th>
        <th>Paikka</th>
        <th>Aika</th>
      </tr>
    </thead>
    <tbody>
      <Events events={events} handleShowEventClick={handleShowEventClick} eventsToShowDetails={eventsToShowDetails} />
    </tbody>
  </table>
)

const Events = ({ events, handleShowEventClick, eventsToShowDetails }) => {
  return (
    events.map(event => <Event key={event.id} event={event} handleShowEventClick={() => handleShowEventClick(event.id)} eventsToShowDetails={eventsToShowDetails} />)
  )
}

const Event = ({ event, handleShowEventClick, eventsToShowDetails }) => {
  console.log(eventsToShowDetails)
  console.log(eventsToShowDetails.includes(event.id))
  if (eventsToShowDetails.includes(event.id)) {
    return (
      <tr>
        <td colSpan="3">
          <h2 className='details-header' onClick={handleShowEventClick}>{event.name}</h2>
          <h3>Paikka</h3>
          <p>{event.location}</p>
          <h3>Aika</h3>
          <p>{event.time}</p>
          <h3>Kuvaus</h3>
          <p>{event.description}</p>
        </td>
      </tr>
    )
  } else {
    return (
      <tr onClick={handleShowEventClick}>
        <td>{event.name}</td>
        <td>{event.location}</td>
        <td>{event.time}</td>
      </tr>
    )
  }
}

function App() {
  const [eventsToShowDetails, eventsToShowDetailsSet] = useState([])
  const events = [
    {
      id: 1,
      name: 'Konsertti 1',
      location: 'Oulu',
      time: '12:30',
      description: 'laulua'
    },
    {
      id: 2,
      name: 'Konsertti 2',
      location: 'Vaasa',
      time: '12:40',
      description: 'musiikkia'
    },
    {
      id: 3,
      name: 'Kävely',
      location: 'kuu',
      time: '25:00',
      description: 'ei ilmaa'
    }
  ]

  const handleShowEventClick = (idShow) => {
    console.log('handleShowEventClick event', idShow)
    if (eventsToShowDetails.includes(idShow)) {
      eventsToShowDetailsSet(eventsToShowDetails.filter((id) => id !== idShow))
    } else {
      eventsToShowDetailsSet(eventsToShowDetails.concat(idShow))
    }
    console.log(eventsToShowDetails)
  }

  return (
    <div className="App">
      <h1>Ilmoitustaulu</h1>
      <EventTable events={events} handleShowEventClick={handleShowEventClick} eventsToShowDetails={eventsToShowDetails} />
    </div>
  )
}

export default App;
