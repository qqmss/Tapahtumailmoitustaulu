import axios from 'axios'

const baseUrl = '/api/events'

const getAll = (eventId) => {
  return axios
    .get(`${baseUrl}/${eventId}/comments`)
    .then(response => response.data)
    .then(data => {
      data.forEach(comment => {
        comment.createdTime = new Date(comment.createdTime)
        comment.eventId = eventId
      })
      return data
    })
}

const create = (eventId, comment) => {
  return axios
    .post(`${baseUrl}/${eventId}/comments`, comment)
    .then(response => response.data)
    .then(SaveComment => {
      SaveComment.createdTime = new Date(SaveComment.createdTime)
      SaveComment.eventId = eventId
      return SaveComment
    })
}

const erase = (eventId, commentId) => {
  return axios
    .delete(`${baseUrl}/${eventId}/comments/${commentId}`)
}

export default { getAll, create, erase }