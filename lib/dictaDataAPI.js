/**
 * /client/dictaDataAPI.js
 *
 * Create an axios instance pointing to a dicta API server
 * with user authorization credentials.
 *
 */

import axios from 'axios'

export default class DictaDataAPI {

  constructor(options) {
    this.options = options || {}
    this.account = this.options.account || {}

    let userid = this.account.userid || 'guest'
    let password = this.account.password || 'guest'
    let request_config = {
      baseURL: this.options.baseURL || 'https://api.dictadata.org',
      headers: {
        common: {
          Authorization: 'Basic ' + my_btoa(userid + ':' + password)
        }
      }
    }

    this.axios = axios.create(request_config)
  }

}

const my_btoa = (str) => {
  try {
    return btoa(str)
  } catch (err) {
    return Buffer.from(str).toString('base64')
  }
}
