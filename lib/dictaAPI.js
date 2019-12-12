/**
 * /services/dictaAPI.js
 */

const axios = require('axios')

module.exports = (user) => {
  let userid = user.userid || 'guest'
  let password = user.password || 'guest'

  return axios.create({
    baseURL: process.env.VUE_APP_DICTA_API,
    headers: {
      common: {
        Authorization: 'Basic ' + btoa(userid + ':' + password)
      }
    }
  })
}
