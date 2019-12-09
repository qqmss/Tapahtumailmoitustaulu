/**
 * events module. Tapahtumiin liittyvät pyynnöt.
 * @module services/events
 */

import axios from 'axios'

const baseUrl = '/api/events'

/**
 * Hae kaikki tapahtumat.
 * @returns {Promise<Object[]>} Lista rest apista haetuista tapahtuma olioista
 */
const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data)
    .then(data => {
      data.forEach(event => {
        event.time = new Date(event.time)
        event.createdTime = new Date(event.createdTime)
      })
      return data
    })
}

/**
 * Lähetä tapahtuma.
 * @param {object} event - Tapahtuma lähetettäväksi palvelimelle rest rajapinnan avulla.
 * @param {number} event.participants - Tapahtuman oasllistuja määrä.
 * @param {string} event.name - Tapahtuman nimi.
 * @param {string} event.location - Tapahtuman paikka.
 * @param {Date} event.time - Tapahtuman aika.
 * @param {string} event.description - Tapahtuman kuvaus.
 * @returns {Promise<Object>} Lisätty tapahtuma oliona.
 */
const create = (event) => {
  return axios
    .post(baseUrl, event)
    .then(response => response.data)
    .then(data => {
      if (data) {
        data.time = new Date(data.time)
        data.createdTime = new Date(data.createdTime)
      }
      return data
    })
}

/**
 * Lähetä pyyntö tapahtuman päivittämiseksi
 * @param {string} id - rest rajapinnassa olevan tapahtuman id
 * @param {object} event - tapahtuma olio jolla halutaan korvata tietoja.
 * @returns {Promise<Object>} Päivitetty tapahtuma olio.
 */
const update = (id, event) => {
  return axios
    .put(`${baseUrl}/${id}`, event)
    .then(response => response.data)
    .then(data => {
      data.time = new Date(data.time)
      data.createdTime = new Date(data.createdTime)
      return data
    })
}

/**
 * Poista tapahtuma id:n perusteella
 * @param {string} id - poistettavan tapahtuman id.
 */
const erase = (id) => axios.delete(`${baseUrl}/${id}`)

export default { getAll, create, update, erase }