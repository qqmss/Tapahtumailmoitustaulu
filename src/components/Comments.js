/**
 * Comments module. Kommentointi ja kommentit.
 * @module components/Comments
 * @type {JSX.Element}
 */

import React from 'react'

/**
 * Kommentit komponentti
 * @param {object[]} comments - Kommentti oliot.
 * @param {string} comments[].author - Kommentin nimimerkki.
 * @param {string} comments[].message - Kommentin viesti
 * @param {Date} comments[].createdTime - Kommentin luonti aika.
 * @param {string} comments.id - Kommentin id.
 * @param {string} eventId - Liittyvän tapahtuman id.
 * @param {function(string)} setCommentFormEventId - Asettaa tapahtumaa jota kommentoidaan liittyvän id tapahtuma id:n.
 * @param {string} commentFormEventId - Kommentoitavan tapahtuman id.
 * @param {function(string)} handleCommentSubmit - Kommentti lomakkeen lähetyksen tapahtuman käsittelijä.
 * @param {string} newAuthor - Kommentin lomakkeessa oleva nimimerkki.
 * @param {function(string)} setNewAuthor - Asettaa kommentin lomakkeen nimimerkin sen muuttuessa.
 * @param {string} newMessage - Kommentti lomakkeessa oleva viesti.
 * @param {function(string)} setNewMessage - Asettaa kommentin lomakkeen viestin sen lomakkeessa muuttuessa.
 * @param {function(string, string)} handleDeleteCommentClick - Poista kommentti sen sen id ja tapahtuman id avulla johon se on liitetty.
 * @returns {JSX.Element} Kommentit komponentti
 */
const Comments = ({ comments, eventId, setCommentFormEventId, commentFormEventId, handleCommentSubmit, newAuthor,
  setNewAuthor, newMessage, setNewMessage, handleDeleteCommentClick }) => (
    <div>
      {comments.map(comment => <Comment key={comment.id} comment={comment} handleDeleteCommentClick={() => handleDeleteCommentClick(eventId, comment.id)} />)}
      <button onClick={() => setCommentFormEventId(commentFormEventId !== eventId ? eventId : '')}>Lisää kommentti</button>
      <CommentForm handleCommentSubmit={handleCommentSubmit} newAuthor={newAuthor} setNewAuthor={setNewAuthor}
        newMessage={newMessage} setNewMessage={setNewMessage} commentFormEventId={commentFormEventId} eventId={eventId} />
    </div>
  )

/**
 * Kommentti komponentti. Näytettävä kommentti.
 * @param {object} comment - Kommentti olio.
 * @param {string} comment.author - Kommentin nimimerkki.
 * @param {string} comment.message - Kommentin viesti
 * @param {Date} comment.createdTime - Kommentin luonti aika.
 * @param {string} comments.id - Kommentin id.
 * @param {function()} handleDeleteCommentClick - poistaa tämän komponentin kuvaaman kommentin.
 * @returns {JSX.Element} Kommentti komponentti.
 */
const Comment = ({ comment, handleDeleteCommentClick }) => (
  <div className='comment'>
    <div className='comment-author'><em>{comment.author} {comment.createdTime.toLocaleString()}</em>
      <button className='delete-button' onClick={handleDeleteCommentClick}>Poista</button></div>
    <p className='comment-mesage'>{comment.message}</p>
  </div>
)

/**
 * Kommentointi lomake komponentti.
 * @param {function()} handleCommentSubmit - Kommentti lomakkeen lähetyksen tapahtuman käsittelijä.
 * @param {string} newAuthor - Kommentin lomakkeen nimimerkki.
 * @param {function(string)} setNewAuthor - Asettaa kommentin lomakkeen nimimerkin sen muuttuessa.
 * @param {string} newMessage - Kommentti lomakkeen viesti.
 * @param {function(string)} setNewMessage - Asettaa kommentin lomakkeen viestin sen muuttuessa. 
 * @param {string} commentFormEventId - Kommentoitavan tapahtuman id.
 * @param {string} eventId - Liittyvän tapahtuman id.
 * @returns {JSX.Element} Kommentointi lomake komponentti.
 */
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