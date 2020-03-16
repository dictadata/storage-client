/**
 * /services/dictaAPI.js
 *
 * Create an axios instance pointing to a dicta API server
 * with user authorization credentials.
 *
 */

const axios = require('axios')

module.exports = (user) => {
  let userid = user.userid || 'guest'
  let password = user.password || 'guest'

  return axios.create({
    baseURL: process.env.VUE_APP_DICTA_API,
    headers: {
      common: {
        Authorization: 'Basic ' + my_btoa(userid + ':' + password)
      }
    }
  })
}

const my_btoa = (str) => {
  try {
      return btoa(str);
  } catch(err) {
      return Buffer.from(str).toString('base64')
  }
};
