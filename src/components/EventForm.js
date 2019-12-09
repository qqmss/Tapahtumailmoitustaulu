/**
 * EventForm module. Uusi tapahtuma lomake.
 * @module components/EventForm
 * @type {JSX.Element}
 */

import React from 'react'

/**
 * Uuden tapahtuman lomake komponetti.
 * @param {function} handleEventSubmit - Lomakkeen lähetyksen tapahtuman käsittelijä.
 * @param {string} newName - Tapahtuma lomakkeessa oleva nimi.
 * @param {function} setNewName - Tapahtuman nimen asettaja.
 * @param {string} newLocation - Tapahtuma lomakkeessa oleva paikka.
 * @param {function} setNewLocation - Tapahtuman paikkan asettaja.
 * @param {string} newTime - Tapahtuma lomakkeessa oleva aika.
 * @param {function} setNewTime - Tapahtuman ajan asettaja.
 * @param {string} newDescription - Tapahtuma lomakkeessa oleva kuvaus.
 * @param {function} setNewDescription - Tapahtuman kuvauksen asettaja.
 * @returns {JSX.Element} Uusi tapahtuma lomake komponentti.
 */
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