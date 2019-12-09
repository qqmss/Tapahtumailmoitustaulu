import React from 'react'

const EventForm = ({ handleEventSubmit, newName, setNewName, newLocation, setNewLocation, newTime, setNewTime, newDescription, setNewDescription }) => (
  <form onSubmit={handleEventSubmit} className='event-form'>
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


export default EventForm