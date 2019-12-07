import axios from 'axios'

const baseUrl = '/api/events'

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

const erase = (id) => axios.delete(`${baseUrl}/${id}`)

export default { getAll, create, update, erase }