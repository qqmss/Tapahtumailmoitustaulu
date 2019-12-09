/**
 * comments module. Kommentteihin liittyvät pyynnöt.
 * @module services/comments
 */

import axios from 'axios'

const baseUrl = '/api/events'

/**
 * Hae kaikki tapahtuman kommentit.
 * @param {string} eventId - Tapahtuman id jonka kaikki kommentit haetaan.
 * @returns {Promise<Object[]>} Lista rest apista haetuista tapahtuman kommetti olioista.
 */
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

/**
 * Lähetä kommetti.
 * @param {string} eventId Tapahtuman id johon kommentti viittaa.
 * @param {object} comment - Kommentti olio.
 * @param {string} comment.author - Kommentin nimimerkki.
 * @param {string} comment.message - Kommentin viesti.
 * @returns {Promise<Object>} Lisätty kommentti oliona.
 */
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

/**
 * Poista kommentti
 * @param {string} eventId - Poistettavan kommentin tapahtuman id.
 * @param {string} commentId - Poistettavan kommentin id.
 */
const erase = (eventId, commentId) => {
  return axios
    .delete(`${baseUrl}/${eventId}/comments/${commentId}`)
}

export default { getAll, create, erase }