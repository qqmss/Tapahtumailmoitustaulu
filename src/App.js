/**
 * Web-sovellus ilmoitustaulu front-end module.
 * @module App
 * @type {object}
 * @version 1.0.0
 * @author mika
 */

import React, { useState, useEffect } from 'react';
import './App.css';
import eventService from './services/events'
import commentService from './services/comments'
import EventTable from  './components/EventTable'
import EventForm from './components/EventForm'

/**
 * Komponetti virheilmoitukselle. 
 * @param {string} message - Näytettävä virheviesti.
 * @param {function(string)} setErrorMessage - Muuttaa virheviestin.
 * @returns {object} Virheilmoitus komponetti.
 */
const ErrorNotification = ({ message, setErrorMessage }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='error-notification'>
      {message}
      <button onClick={() => setErrorMessage(null)}>Sulje</button>
    </div>
  )
}

/**
 * Komponetti tapahtumien tapahtumisen ilmoittamiseksi.
 * @param {string} message - Näytettävä viesti.
 * @param {function(string)} setSuccessMessage - Muuttaa viestin.
 * @returns {object} Ilmoitus komponentti.
 */
const SuccessNotification = ({ message, setSuccessMessage }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='success-notification'>
      {message}
      <button onClick={() => setSuccessMessage(null)}>Sulje</button>
    </div>
  )
}

/**
 * ilmoitustaulu app
 * @returns {object} ilmoitustaulu komponentti
 */
function App() {
  /**
   * @type {[string, function(string)]} - Tapahtuman nimi ja sen muuttaja.
   */
  const [newName, setNewName] = useState('')
  /**
   * @type {[string, function(string)]} - Tapahtuman paikka ja sen muuttaja.
   */
  const [newLocation, setNewLocation] = useState('')
  /**
   * @type {[string, function(string)]} - Tapahtuman aika ja sen muuttaja.
   */
  const [newTime, setNewTime] = useState('')
  /**
   * @type {[string, function(string)]} - Tapahtuman kuvaus ja sen muuttaja.
   */
  const [newDescription, setNewDescription] = useState('')
  /**
   * @type {[string, function(string)]} - Kommentin kirjoittaja ja sen muuttaja
   */
  const [newAuthor, setNewAuthor] = useState('')
  /**
  *@type {[string, function(string)]} - Kommentin viesti ja sen muuttaja.
  */
  const [newMessage, setNewMessage] = useState('')
  /**
   * @type {[string, function(string)]} - Kommentoitavan tapahtuman id ja sen muuttaja.
   */
  const [commentFormEventId, setCommentFormEventId] = useState('')
  /**
   * @type {[string[], function(string[])]} - Tapahtumien id:t, joista näytetään lisätiedot ja sen muuttaja.
   */
  const [eventsToShowDetails, setEventsToShowDetails] = useState([])
  /**
   * @type {[object[], function(object[])]} - Tapahtumi kuvaavat oliot ja niiden muuttaja.
   */
  const [events, setEvents] = useState([])
  /**
   * @type {[object[], function(object[])]} - Kommentteja kuvaavat oliot ja niiden muuttaja.
   */
  const [comments, setComments] = useState([])
  /**
   * @type {[(string|null), function(string|null)]} - Virheilmoitus viesti ja sen muuttaja 
   */
  const [errorMessage, setErrorMessage] = useState(null)
  /**
   * @type {[(string|null), function(string|null)]} - Ilmoitus viesti ja sen muuttaja 
   */
  const [successMessage, setSuccessMessage] = useState(null)


  useEffect(() => {
    eventService.getAll()
      .then(data => setEvents(data))
  }, [])

  useEffect(() => {
    setNewAuthor('')
    setNewMessage('')
  }, [commentFormEventId])

  /**
   * Näyttää tapahtuman lisätiedot ja hakee sen kommentit.
   * @param {string} idShow - Tapahtuman jonka lisätiedot näytetään id.
   */
  const handleShowEventClick = (idShow) => {
    if (eventsToShowDetails.includes(idShow)) {
      setEventsToShowDetails(eventsToShowDetails.filter(id => id !== idShow))
    } else {
      setEventsToShowDetails(eventsToShowDetails.concat(idShow))
      if (!comments.some(comment => comment.eventId === idShow)) {
        commentService
          .getAll(idShow)
          .then(data => {
            setComments(comments.concat(data))
          })
      }
    }
  }
  
  /**
   * Lisää tapahtumalle osallistujan. Ilmoittaa onnistumisesta tai epäonnistumisesta.
   * Jos tapahtuma oli jo poistettu, päivittää näkymän vastaamaan sitä.
   * @param {string} idJoin - Tapahtuman johon lisätään osallistuja id.
   */
  const handleJoinEventClick = (idJoin) => {
    const participants = events.find(event => event.id === idJoin).participants
    eventService
      .update(idJoin, { participants: participants + 1 })
      .then(data => {
        setEvents(events.map(event => event.id !== data.id ? event : data))
        setSuccessMessage(`Osallistuit tapahtumaan "${data.name}".`)
        window.setTimeout(() => setSuccessMessage(null), 5000)
      })
      .catch(error => {
        console.log(error.response.data.error)
        if (error.response.status === 404) {
          setErrorMessage(`Tapahtuma ${events.find(event => event.id === idJoin).name} oli poistettu palvelimelta`)
          window.setTimeout(() => setErrorMessage(null), 5000)
          setEvents(events.filter(event => event.id !== idJoin))
        } else {
          setErrorMessage(error.response.data.error)
          window.setTimeout(() => setErrorMessage(null), 5000)
        }
      })
  }

  /**
   * Lisää tapahtuman lomakkeen tiedoista. Ilmoittaa lomakkeen puutteista.
   * Ilmoittaa onnistumisesta tai epäonnistumisesta.
   * @param {object} event - Form onSubmit Event.
   */
  const handleEventSubmit = (event) => {
    event.preventDefault()
    const newEvent = {
      name: newName,
      location: newLocation,
      time: new Date(newTime),
      description: newDescription,
    }
    eventService
      .create(newEvent)
      .then(data => {
        setEvents(events.concat(data))
        setNewName('')
        setNewLocation('')
        setNewTime('')
        setNewDescription('')
        setSuccessMessage(`Tapahtuma ${data.name} luotu.`)
        window.setTimeout(() => setSuccessMessage(null), 5000)
      })
      .catch(error => {
        console.log(error.response.data.error)
        if (error.response.status === 400) {
          setErrorMessage(`Täytä uuden tapahtuman kentät`)
          window.setTimeout(() => setErrorMessage(null), 5000)
        } else {
          setErrorMessage(error.response.data.error)
          window.setTimeout(() => setErrorMessage(null), 5000)
        }
      })
  }

  /**
   * Poistaa tapahtuman.
   * @param {string} idDelete - Poistettavan tapahtuman id
   */
  const handleDeleteEventClick = (idDelete) => {
    eventService
      .erase(idDelete)
      .then(() => {
        setSuccessMessage(`Tapahtuma ${events.find(event => event.id === idDelete).name} poistettu.`)
        window.setTimeout(() => setSuccessMessage(null), 5000)
        setEvents(events.filter(event => event.id !== idDelete))
        setEventsToShowDetails(eventsToShowDetails.filter(id => id !== idDelete))
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        window.setTimeout(() => setErrorMessage(null), 5000)
      })
  }

  /**
   * Lisää tapahtumalle kommentin kommenttilomakkeen tiedoista. Ilmoittaa lomakkeen puutteista. 
   * Ilmoittaa onnistumisesta tai epäonnistumisesta. Jos tapahtuma oli jo poistettu, päivittää näkymän vastaamaan sitä.
   * @param {object} event Form onSubmit Event.
   */
  const handleCommentSubmit = (event) => {
    event.preventDefault()
    const newComment = {
      author: newAuthor,
      message: newMessage
    }
    commentService
      .create(commentFormEventId, newComment)
      .then(SaveComment => {
        setComments(comments.concat(SaveComment))
        setNewAuthor('')
        setNewMessage('')
      })
      .catch(error => {
        console.log(error.response.data.error)
        if (error.response.status === 404) {
          setErrorMessage(`Tapahtuma ${events.find(event => event.id === commentFormEventId).name} oli poistettu palvelimelta.`)
          window.setTimeout(() => setErrorMessage(null), 5000)
          setEvents(events.filter(event => event.id !== commentFormEventId))
        } else if (error.response.status === 400) {
          setErrorMessage(`Täytä uuden kommentin kentät`)
          window.setTimeout(() => setErrorMessage(null), 5000)
        } else {
          setErrorMessage(error.response.data.error)
          window.setTimeout(() => setErrorMessage(null), 5000)
        }
      })
  }

  /**
   * Poistaa kommentin. Jos tapahtuma oli jo poistettu, päivittää näkymän vastaamaan sitä.
   * @param {string} eventId - Poistettavan kommentin tapahtuman id.
   * @param {string} commentId - Poistettavan kommentin id.
   */
  const handleDeleteCommentClick = (eventId, commentId) => {
    commentService.erase(eventId, commentId)
      .then(() => setComments(comments.filter(comment => comment.id !== commentId)))
      .catch(error => {
        console.log(error.response.data.error)
        if (error.response.status === 404) {
          setErrorMessage(`Tapahtuma ${events.find(event => event.id === eventId).name} oli poistettu palvelimelta.`)
          window.setTimeout(() => setErrorMessage(null), 5000)
          setEvents(events.filter(event => event.id !== eventId))
        } else {
          setErrorMessage(error.response.data.error)
          window.setTimeout(() => setErrorMessage(null), 5000)
        }
      })
  }

  return (
    <div className="App">
      <div className='notification'>
        <ErrorNotification message={errorMessage} setErrorMessage={setErrorMessage} />
        <SuccessNotification message={successMessage} setSuccessMessage={setSuccessMessage} />
      </div>
      <h1>Ilmoitustaulu</h1>
      <EventTable events={events} comments={comments} handleShowEventClick={handleShowEventClick} handleJoinEventClick={handleJoinEventClick}
        handleDeleteEventClick={handleDeleteEventClick} eventsToShowDetails={eventsToShowDetails} setEventsToShowDetails={setEventsToShowDetails}
        setCommentFormEventId={setCommentFormEventId} commentFormEventId={commentFormEventId} handleCommentSubmit={handleCommentSubmit} 
        newAuthor={newAuthor} setNewAuthor={setNewAuthor} newMessage={newMessage} setNewMessage={setNewMessage} handleDeleteCommentClick={handleDeleteCommentClick} />
      <EventForm handleEventSubmit={handleEventSubmit} newName={newName} setNewName={setNewName} newLocation={newLocation} setNewLocation={setNewLocation}
        newTime={newTime} setNewTime={setNewTime} newDescription={newDescription} setNewDescription={setNewDescription} />
    </div>
  )
}

export default App;
