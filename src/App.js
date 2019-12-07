import React, { useState, useEffect } from 'react';
import './App.css';
import eventService from './services/events'
import commentService from './services/comments'

const EventTable = ({ events, comments, handleShowEventClick, handleJoinEventClick, handleDeleteEventClick, eventsToShowDetails, setCommentFormEventId, commentFormEventId, handleCommentSubmit, newAuthor, setNewAuthor, newMessage, setNewMessage, handleDeleteCommentClick }) => (
  <table>
    <thead>
      <tr>
        <th>Tapahtuma</th>
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
          <h3>Paikka</h3>
          <p>{event.location}</p>
          <h3>Aika</h3>
          <p>{event.time.toLocaleString()}</p>
          <h3>Kuvaus</h3>
          <p>{event.description}</p>
          <h3>Osallistujat</h3>
          <p>{event.participants}</p>
          <button onClick={handleJoinEventClick}>Osallistu</button>
          <button className='delete-button' onClick={handleDeleteEventClick} >Poista</button>
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
      <div className='comment-author'>{comment.author} <button className='delete-button' onClick={handleDeleteCommentClick}>Poista</button></div>
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

function App() {
  /*
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
  */
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

  useEffect(() => {
    eventService.getAll()
      .then(data => setEvents(data))
  }, [])

  useEffect(() => {
    setNewAuthor('')
    setNewMessage('')
  }, [commentFormEventId])

  const handleShowEventClick = (idShow) => {
    console.log('handleShowEventClick event', idShow)
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
    console.log('handleJoinEventClick event', idJoin)
    const participants = events.find(event => event.id === idJoin).participants
    eventService
      .update(idJoin, { participants: participants + 1 })
      .then(data => {
        setEvents(events.map(event => event.id !== data.id ? event : data))
      })
      .catch(error => {
        window.alert('jo poistetu')
      })
  }

  const handleEventSubmit = (event) => {
    event.preventDefault()
    const newEvent = {
      name: newName,
      location: newLocation,
      time: new Date(newTime),
      description: newDescription,
      participants: 0
    }
    eventService
      .create(newEvent)
      .then(data => {
        setEvents(events.concat(data))
        setNewName('')
        setNewLocation('')
        setNewTime('')
        setNewDescription('')
      })
  }

  const handleDeleteEventClick = (idDelete) => {
    console.log('handleDeleteEvent event', idDelete)
    eventService
      .erase(idDelete)
      .then(() => {
        setEvents(events.filter(event => event.id !== idDelete))
        setEventsToShowDetails(eventsToShowDetails.filter(id => id !== idDelete))
      })
      .catch(error => {
        window.alert('Poistaminen epäonnistui')
      })
  }

  const handleCommentSubmit = (event) => {
    event.preventDefault()
    console.log('handleCommentSubmit event')
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
  }

  const handleDeleteCommentClick = (eventId, commentId) => {
    console.log('handleDeleteCommentClick event', eventId, commentId)
    commentService.erase(eventId, commentId)
      .then(() => setComments(comments.filter(comment => comment.id !== commentId)))
  }

  return (
    <div className="App">
      <h1>Ilmoitustaulu</h1>
      <EventTable events={events} comments={comments} handleShowEventClick={handleShowEventClick} handleJoinEventClick={handleJoinEventClick}
        handleDeleteEventClick={handleDeleteEventClick} eventsToShowDetails={eventsToShowDetails} setCommentFormEventId={setCommentFormEventId}
        commentFormEventId={commentFormEventId} handleCommentSubmit={handleCommentSubmit} newAuthor={newAuthor} setNewAuthor={setNewAuthor}
        newMessage={newMessage} setNewMessage={setNewMessage} handleDeleteCommentClick={handleDeleteCommentClick} />
      <EventForm handleEventSubmit={handleEventSubmit} newName={newName} setNewName={setNewName} newLocation={newLocation} setNewLocation={setNewLocation}
        newTime={newTime} setNewTime={setNewTime} newDescription={newDescription} setNewDescription={setNewDescription} />
    </div>
  )
}

export default App;
