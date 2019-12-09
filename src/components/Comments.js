import React from 'react'

const Comments = ({ comments, eventId, setCommentFormEventId, commentFormEventId, handleCommentSubmit, newAuthor,
  setNewAuthor, newMessage, setNewMessage, handleDeleteCommentClick }) => (
    <div>
      {comments.map(comment => <Comment key={comment.id} comment={comment} handleDeleteCommentClick={() => handleDeleteCommentClick(eventId, comment.id)} />)}
      <button onClick={() => setCommentFormEventId(commentFormEventId !== eventId ? eventId : '')}>Lisää kommentti</button>
      <CommentForm handleCommentSubmit={handleCommentSubmit} newAuthor={newAuthor} setNewAuthor={setNewAuthor}
        newMessage={newMessage} setNewMessage={setNewMessage} commentFormEventId={commentFormEventId} eventId={eventId} />
    </div>
  )


const Comment = ({ comment, handleDeleteCommentClick }) => (
  <div className='comment'>
    <div className='comment-author'><em>{comment.author} {comment.createdTime.toLocaleString()}</em>
      <button className='delete-button' onClick={handleDeleteCommentClick}>Poista</button></div>
    <p className='comment-mesage'>{comment.message}</p>
  </div>
)


const CommentForm = ({ handleCommentSubmit, newAuthor, setNewAuthor, newMessage, setNewMessage, commentFormEventId, eventId }) => {
  if (commentFormEventId === eventId) {
    return (
      <form onSubmit={handleCommentSubmit} className='comment-form'>
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

export default Comments