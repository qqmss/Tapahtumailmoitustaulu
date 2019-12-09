/**
 * EventTable module. EventTable ja sen komponentit.
 * @module components/EventTable
 * @type {JSX.Element}
 */

import React from 'react'
import Comments from './Comments'

/**
 * Taulu tapahtumista komponentti.
 * @param {object[]} events - Tapahtuma oliot.
 * @param {number} events[].participants - Tapahtuman oasllistuja määrä.
 * @param {string} events[].name - Tapahtuman nimi.
 * @param {string} events[].location - Tapahtuman paikka.
 * @param {Date} events[].time - Tapahtuman aika.
 * @param {string} events[].description - Tapahtuman kuvaus.
 * @param {Date} events[].createdTime - Tapahtuman luonti aika.
 * @param {string} events[].id - Tapahtuman id.
 * @param {object[]} comments - Kommentti oliot.
 * @param {string} comments[].author - Kommenttin nimimerkki.
 * @param {string} comments[].message - Kommenttin viesti.
 * @param {Date} comments[].createdTime - Kommenttin luomisaika.
 * @param {string} comments[].id - Kommenttin id.
 * @param {function(string)} handleShowEventClick - Näyttää tapahtuman lisätiedot.
 * @param {function(string)} handleJoinEventClick - Lisää tapahtumalle osallistujan.
 * @param {function(string)} handleDeleteEventClick - Poistaa kommentin.
 * @param {string[]} eventsToShowDetails - Tapahtumien id:t joista näytetään lisätiedot.
 * @param {function(string[])} setEventsToShowDetails - Asettaa tapahtumien id:t joista näytetään lisätiedot.
 * @param {function(string)} setCommentFormEventId - Asettaa kommentoitavan tapahtuman tapahtuma id:n.
 * @param {string} commentFormEventId - Kommentoitavan tapahtuman tapahtuma id.
 * @param {function(object)} handleCommentSubmit - Kommentti lomakkeen lähetyksen tapahtuman käsittelijä.
 * @param {string} newAuthor - Kommentin lomakkeessa oleva nimimerkki.
 * @param {function(string)} setNewAuthor - Kommentin lomakkeessa oleva nimimerkki asettaja.
 * @param {string} newMessage - Kommentti lomakkeessa oleva viesti.
 * @param {function(string)} setNewMessage - Kommentti lomakkeessa oleva viestin asettaja.
 * @param {function(string, string)} handleDeleteCommentClick - Poista kommentti.
 * @returns {JSX.Element} Taulu tapahtumista komponentti.
 */
const EventTable = ({ events, comments, handleShowEventClick, handleJoinEventClick, handleDeleteEventClick, eventsToShowDetails,
  setEventsToShowDetails, setCommentFormEventId, commentFormEventId, handleCommentSubmit, newAuthor, setNewAuthor, newMessage,
  setNewMessage, handleDeleteCommentClick }) => (
    <table>
      <thead>
        <tr>
          <th>
            <button className='show-all-event-details' onClick={() => setEventsToShowDetails(events.map(event => event.id))}>Näytä</button>
            <button className='show-all-event-details' onClick={() => setEventsToShowDetails([])}>Piilota</button>
            Tapahtuma</th>
          <th>Paikka</th>
          <th>Aika</th>
        </tr>
      </thead>
      <tbody>
        <Events events={events} comments={comments} handleShowEventClick={handleShowEventClick} handleJoinEventClick={handleJoinEventClick}
          handleDeleteEventClick={handleDeleteEventClick} eventsToShowDetails={eventsToShowDetails} setCommentFormEventId={setCommentFormEventId}
          commentFormEventId={commentFormEventId} handleCommentSubmit={handleCommentSubmit} newAuthor={newAuthor} setNewAuthor={setNewAuthor}
          newMessage={newMessage} setNewMessage={setNewMessage} handleDeleteCommentClick={handleDeleteCommentClick} />
      </tbody>
    </table>
  )

/**
 * Tapahtumat komponentti.
 * @param {object[]} events - Tapahtuma oliot.
 * @param {number} events[].participants - Tapahtuman oasllistuja määrä.
 * @param {string} events[].name - Tapahtuman nimi.
 * @param {string} events[].location - Tapahtuman paikka.
 * @param {Date} events[].time - Tapahtuman aika.
 * @param {string} events[].description - Tapahtuman kuvaus.
 * @param {Date} events[].createdTime - Tapahtuman luonti aika.
 * @param {string} events[].id - Tapahtuman id.
 * @param {object[]} comments - Kommentti oliot.
 * @param {string} comments[].author - Kommenttin nimimerkki.
 * @param {string} comments[].message - Kommenttin viesti.
 * @param {Date} comments[].createdTime - Kommenttin luomisaika.
 * @param {string} comments[].id - Kommenttin id.
 * @param {function(string)} handleShowEventClick - Näyttää tapahtuman lisätiedot.
 * @param {function(string)} handleJoinEventClick - Lisää tapahtumalle osallistujan.
 * @param {function(string)} handleDeleteEventClick - Poistaa kommentin.
 * @param {string[]} eventsToShowDetails - Tapahtumien id:t joista näytetään lisätiedot.
 * @param {function(string)} setCommentFormEventId - Asettaa kommentoitavan tapahtuman tapahtuma id:n.
 * @param {string} commentFormEventId - Kommentoitavan tapahtuman tapahtuma id.
 * @param {function(object)} handleCommentSubmit - Kommentti lomakkeen lähetyksen tapahtuman käsittelijä.
 * @param {string} newAuthor - Kommentin lomakkeessa oleva nimimerkki.
 * @param {function(string)} setNewAuthor - Kommentin lomakkeessa oleva nimimerkki asettaja.
 * @param {string} newMessage - Kommentti lomakkeessa oleva viesti.
 * @param {function(string)} setNewMessage - Kommentti lomakkeessa oleva viestin asettaja.
 * @param {function(string, string)} handleDeleteCommentClick - Poista kommentti.
 * @returns {JSX.Element[]} Tapahtuma lista
 */
const Events = ({ events, comments, handleShowEventClick, handleJoinEventClick, handleDeleteEventClick, eventsToShowDetails, setCommentFormEventId,
  commentFormEventId, handleCommentSubmit, newAuthor, setNewAuthor, newMessage, setNewMessage, handleDeleteCommentClick }) => (
    events.map(event => <Event key={event.id} event={event} comments={comments} handleShowEventClick={() => handleShowEventClick(event.id)}
      handleJoinEventClick={() => handleJoinEventClick(event.id)} handleDeleteEventClick={() => handleDeleteEventClick(event.id)}
      eventsToShowDetails={eventsToShowDetails} setCommentFormEventId={setCommentFormEventId} commentFormEventId={commentFormEventId}
      handleCommentSubmit={handleCommentSubmit} newAuthor={newAuthor} setNewAuthor={setNewAuthor} newMessage={newMessage} setNewMessage={setNewMessage}
      handleDeleteCommentClick={handleDeleteCommentClick} />)
  )

/**
 * Tapahtuma komponentti. Tapahtuma lisätietoineen tai ilman riippuen listasta eventsToShowDetails.
 * @param {object} events - Tapahtuma olio.
 * @param {number} event.participants - Tapahtuman oasllistuja määrä.
 * @param {string} event.name - Tapahtuman nimi.
 * @param {string} event.location - Tapahtuman paikka.
 * @param {Date} event.time - Tapahtuman aika.
 * @param {string} event.description - Tapahtuman kuvaus.
 * @param {Date} event.createdTime - Tapahtuman luonti aika.
 * @param {string} events.id - Tapahtuman id.
 * @param {object} comments - Kommentti oliot.
 * @param {string} comments.author - Kommenttin nimimerkki.
 * @param {string} comments.message - Kommenttin viesti.
 * @param {Date} comments.createdTime - Kommenttin luomisaika.
 * @param {string} comments.id - Kommenttin id.
 * @param {function()} handleShowEventClick - Näyttää tapahtuman lisätiedot.
 * @param {function()} handleJoinEventClick - Lisää tapahtumalle osallistujan.
 * @param {function()} handleDeleteEventClick - Poistaa kommentin.
 * @param {string[]} eventsToShowDetails - Tapahtumien id:t joista näytetään lisätiedot.
 * @param {function(string)} setCommentFormEventId - Asettaa kommentoitavan tapahtuman tapahtuma id:n.
 * @param {string} commentFormEventId - Kommentoitavan tapahtuman tapahtuma id.
 * @param {function(object)} handleCommentSubmit - Kommentti lomakkeen lähetyksen tapahtuman käsittelijä.
 * @param {string} newAuthor - Kommentin lomakkeessa oleva nimimerkki.
 * @param {function(string)} setNewAuthor - Kommentin lomakkeessa oleva nimimerkki asettaja.
 * @param {string} newMessage - Kommentti lomakkeessa oleva viesti.
 * @param {function(string)} setNewMessage - Kommentti lomakkeessa oleva viestin asettaja.
 * @param {function(string, string)} handleDeleteCommentClick - Poista kommentti.
 * @returns {JSX.Element} Tapahtuma komponentti.
 */
const Event = ({ event, comments, handleShowEventClick, handleJoinEventClick, handleDeleteEventClick, eventsToShowDetails, setCommentFormEventId,
  commentFormEventId, handleCommentSubmit, newAuthor, setNewAuthor, newMessage, setNewMessage, handleDeleteCommentClick }) => {
  if (eventsToShowDetails.includes(event.id)) {
    return (
      <tr>
        <EventDetails event={event} comments={comments} handleShowEventClick={handleShowEventClick} handleJoinEventClick={handleJoinEventClick}
          handleDeleteEventClick={handleDeleteEventClick} setCommentFormEventId={setCommentFormEventId} commentFormEventId={commentFormEventId}
          handleCommentSubmit={handleCommentSubmit} newAuthor={newAuthor} setNewAuthor={setNewAuthor} newMessage={newMessage} setNewMessage={setNewMessage}
          handleDeleteCommentClick={handleDeleteCommentClick} />
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

/**
 * Tapahtuman lisätiedot komponentti.
 * @param {object} event - Tapahtuma oliot.
 * @param {number} event.participants - Tapahtuman oasllistuja määrä.
 * @param {string} event.name - Tapahtuman nimi.
 * @param {string} event.location - Tapahtuman paikka.
 * @param {Date} event.time - Tapahtuman aika.
 * @param {string} event.description - Tapahtuman kuvaus.
 * @param {Date} event.createdTime - Tapahtuman luonti aika.
 * @param {string} event.id - Tapahtuman id.
 * @param {object} comments - Kommentti oliot.
 * @param {string} comments.author - Kommenttin nimimerkki.
 * @param {string} comments.message - Kommenttin viesti.
 * @param {Date} comments.createdTime - Kommenttin luomisaika.
 * @param {string} comments.id - Kommenttin id.
 * @param {function()} handleShowEventClick - Näyttää tapahtuman lisätiedot.
 * @param {function()} handleJoinEventClick - Lisää tapahtumalle osallistujan.
 * @param {function()} handleDeleteEventClick - Poistaa kommentin.
 * @param {function(string)} setCommentFormEventId - Asettaa kommentoitavan tapahtuman tapahtuma id:n.
 * @param {string} commentFormEventId - Kommentoitavan tapahtuman tapahtuma id.
 * @param {function(object)} handleCommentSubmit - Kommentti lomakkeen lähetyksen tapahtuman käsittelijä.
 * @param {string} newAuthor - Kommentin lomakkeessa oleva nimimerkki.
 * @param {function(string)} setNewAuthor - Kommentin lomakkeessa oleva nimimerkki asettaja.
 * @param {string} newMessage - Kommentti lomakkeessa oleva viesti.
 * @param {function(string)} setNewMessage - Kommentti lomakkeessa oleva viestin asettaja.
 * @param {function(string, string)} handleDeleteCommentClick - Poista kommentti.
 * @returns {JSX.Element} Tapahtuman lisätiedot komponentti.
 */
const EventDetails = ({ event, comments, handleShowEventClick, handleJoinEventClick, handleDeleteEventClick, setCommentFormEventId,
  commentFormEventId, handleCommentSubmit, newAuthor, setNewAuthor, newMessage, setNewMessage, handleDeleteCommentClick }) => (
    <td colSpan="3">
      <h2 className='details-header' onClick={handleShowEventClick}>{event.name}</h2>
      <div className='created-time'>Luotu: {event.createdTime.toLocaleString()}<br />
        <button className='delete-button' onClick={handleDeleteEventClick} >Poista</button></div>
      <h3>Paikka</h3>
      <p>{event.location}</p>
      <h3>Aika</h3>
      <p>{event.time.toLocaleString()}</p>
      <h3>Kuvaus</h3>
      <p>{event.description}</p>
      <h3>Osallistujat</h3>
      <p>{event.participants}</p>
      <button onClick={handleJoinEventClick}>Osallistu</button>
      <h3>Kommentit</h3>
      <Comments comments={comments.filter(comment => comment.eventId === event.id)} eventId={event.id} setCommentFormEventId={setCommentFormEventId}
        commentFormEventId={commentFormEventId} handleCommentSubmit={handleCommentSubmit} newAuthor={newAuthor} setNewAuthor={setNewAuthor}
        newMessage={newMessage} setNewMessage={setNewMessage} handleDeleteCommentClick={handleDeleteCommentClick} />
    </td>
  )

export default EventTable