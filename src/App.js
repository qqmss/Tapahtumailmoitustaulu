import React, { useState, useEffect } from 'react';
import './App.css';
import eventService from './services/events'
import commentService from './services/comments'
import EventTable from  './components/EventTable'
import EventForm from './components/EventForm'


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

function App() {
  const [newName, setNewName] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newTime, setNewTime] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [commentFormEventId, setCommentFormEventId] = useState('')
  const [eventsToShowDetails, setEventsToShowDetails] = useState([])
  const [events, setEvents] = useState([])
  const [comments, setComments] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)


  useEffect(() => {
    eventService.getAll()
      .then(data => setEvents(data))
  }, [])

  useEffect(() => {
    setNewAuthor('')
    setNewMessage('')
  }, [commentFormEventId])

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
