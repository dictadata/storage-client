/**
 * /services/dictaAPI.js
 *
 * Create an axios instance pointing to a dicta API server
 * with user authorization credentials.
 *
 */

import axios from 'axios'

export default (account) => {
  let userid = account.userid || 'guest'
  let password = account.password || 'guest'

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
    return btoa(str)
  } catch (err) {
    return Buffer.from(str).toString('base64')
  }
}
