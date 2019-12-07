import React, { useState, useEffect } from 'react';
import './App.css';
import eventService from './services/events'
import commentService from './services/comments'

const EventTable = ({ events, comments, handleShowEventClick, handleJoinEventClick, handleDeleteEventClick, eventsToShowDetails, setEventsToShowDetails, setCommentFormEventId, commentFormEventId, handleCommentSubmit, newAuthor, setNewAuthor, newMessage, setNewMessage, handleDeleteCommentClick }) => (
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
      <Events events={events} comments={comments} handleShowEventClick={handleShowEventClick} handleJoinEventClick={handleJoinEventClick} handleDeleteEventClick={handleDeleteEventClick} eventsToShowDetails={eventsToShowDetails} setCommentFormEventId={setCommentFormEventId} commentFormEventId={commentFormEventId} handleCommentSubmit={handleCommentSubmit} newAuthor={newAuthor} setNewAuthor={setNewAuthor} newMessage={newMessage} setNewMessage={setNewMessage} handleDeleteCommentClick={handleDeleteCommentClick} />
    </tbody>
  </table>
)

const Events = ({ events, comments, handleShowEventClick, handleJoinEventClick, handleDeleteEventClick, eventsToShowDetails, setCommentFormEventId, commentFormEventId, handleCommentSubmit, newAuthor, setNewAuthor, newMessage, setNewMessage, handleDeleteCommentClick }) => {
  return (
    events.map(event => <Event key={event.id} event={event} comments={comments} handleShowEventClick={() => handleShowEventClick(event.id)} handleJoinEventClick={() => handleJoinEventClick(event.id)} handleDeleteEventClick={() => handleDeleteEventClick(event.id)} eventsToShowDetails={eventsToShowDetails} setCommentFormEventId={setCommentFormEventId} commentFormEventId={commentFormEventId} handleCommentSubmit={handleCommentSubmit} newAuthor={newAuthor} setNewAuthor={setNewAuthor} newMessage={newMessage} setNewMessage={setNewMessage} handleDeleteCommentClick={handleDeleteCommentClick} />)
  )
}

const Event = ({ event, comments, handleShowEventClick, handleJoinEventClick, handleDeleteEventClick, eventsToShowDetails, setCommentFormEventId, commentFormEventId, handleCommentSubmit, newAuthor, setNewAuthor, newMessage, setNewMessage, handleDeleteCommentClick }) => {
  if (eventsToShowDetails.includes(event.id)) {
    return (
      <tr>
        <td colSpan="3">
          <h2 className='details-header' onClick={handleShowEventClick}>{event.name}</h2>
          <div className='created-time'>Luotu: {event.createdTime.toLocaleString()}<br /><button className='delete-button' onClick={handleDeleteEventClick} >Poista</button></div>
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
          <Comments comments={comments.filter(comment => comment.eventId === event.id)} eventId={event.id} setCommentFormEventId={setCommentFormEventId} commentFormEventId={commentFormEventId} handleCommentSubmit={handleCommentSubmit} newAuthor={newAuthor} setNewAuthor={setNewAuthor} newMessage={newMessage} setNewMessage={setNewMessage} handleDeleteCommentClick={handleDeleteCommentClick} />
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

const EventForm = ({ handleEventSubmit, newName, setNewName, newLocation, setNewLocation, newTime, setNewTime, newDescription, setNewDescription }) => {
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

const Comments = ({ comments, eventId, setCommentFormEventId, commentFormEventId, handleCommentSubmit, newAuthor, setNewAuthor, newMessage, setNewMessage, handleDeleteCommentClick }) => {
  return (
    <div>
      {comments.map(comment => <Comment key={comment.id} comment={comment} handleDeleteCommentClick={() => handleDeleteCommentClick(eventId, comment.id)} />)}
      <button onClick={() => setCommentFormEventId(commentFormEventId !== eventId ? eventId : '')}>Lisää kommentti</button>
      <CommentForm handleCommentSubmit={handleCommentSubmit} newAuthor={newAuthor} setNewAuthor={setNewAuthor} newMessage={newMessage} setNewMessage={setNewMessage} commentFormEventId={commentFormEventId} eventId={eventId} />
    </div>
  )
}

const Comment = ({ comment, handleDeleteCommentClick }) => {
  return (
    <div className='comment'>
      <div className='comment-author'>{comment.author} {comment.createdTime.toLocaleString()}<button className='delete-button' onClick={handleDeleteCommentClick}>Poista</button></div>
      <p className='comment-mesage'>{comment.message}</p>
    </div>
  )
}

const CommentForm = ({ handleCommentSubmit, newAuthor, setNewAuthor, newMessage, setNewMessage, commentFormEventId, eventId }) => {
  if (commentFormEventId === eventId) {
    return (
      <form onSubmit={handleCommentSubmit}>
        <fieldset>
          <legend>Uusi kommentti</legend>
          <label>
            Nimi tai Nimimerkki:
          <input value={newAuthor} onChange={event => setNewAuthor(event.target.value)} />
          </label>
          <label>
            Viesti:
          <textarea value={newMessage} onChange={event => setNewMessage(event.target.value)} />
          </label>
          <button type='submit'>Lähetä</button>
        </fieldset>
      </form>
    )
  } else {
    return null
  }
}

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
        setCommentFormEventId={setCommentFormEventId} commentFormEventId={commentFormEventId} handleCommentSubmit={handleCommentSubmit} newAuthor={newAuthor} setNewAuthor={setNewAuthor}
        newMessage={newMessage} setNewMessage={setNewMessage} handleDeleteCommentClick={handleDeleteCommentClick} />
      <EventForm handleEventSubmit={handleEventSubmit} newName={newName} setNewName={setNewName} newLocation={newLocation} setNewLocation={setNewLocation}
        newTime={newTime} setNewTime={setNewTime} newDescription={newDescription} setNewDescription={setNewDescription} />
    </div>
  )
}

export default App;
