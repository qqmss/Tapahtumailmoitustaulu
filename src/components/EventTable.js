import React from 'react'
import Comments from './Comments'

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

const Events = ({ events, comments, handleShowEventClick, handleJoinEventClick, handleDeleteEventClick, eventsToShowDetails, setCommentFormEventId,
  commentFormEventId, handleCommentSubmit, newAuthor, setNewAuthor, newMessage, setNewMessage, handleDeleteCommentClick }) => (
    events.map(event => <Event key={event.id} event={event} comments={comments} handleShowEventClick={() => handleShowEventClick(event.id)}
      handleJoinEventClick={() => handleJoinEventClick(event.id)} handleDeleteEventClick={() => handleDeleteEventClick(event.id)}
      eventsToShowDetails={eventsToShowDetails} setCommentFormEventId={setCommentFormEventId} commentFormEventId={commentFormEventId}
      handleCommentSubmit={handleCommentSubmit} newAuthor={newAuthor} setNewAuthor={setNewAuthor} newMessage={newMessage} setNewMessage={setNewMessage}
      handleDeleteCommentClick={handleDeleteCommentClick} />)
  )

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