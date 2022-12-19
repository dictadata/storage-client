/**
 * /client/lib/dictadata-api.js
 *
 * Create an axios instance pointing to a dicta API server
 * with user authorization credentials.
 *
 */

import axios from 'axios'

export default class DictaDataAPI {

  constructor(options) {
    this.options = options || {}

    this.$user = DictaDataAPI.$user || { userid: "guest", password: "guest", isAuthenticated: false, isLocal: true }

    this.axios = axios
  }

  axiosConfig(user, headers) {
    user = user || DictaDataAPI.$user;

    let config = {
      baseURL: this.options.baseURL || DictaDataAPI.baseURL,
      headers: {
        Authorization: 'Basic ' + this._btoa(user.userid + ':' + user.password)
      }
    }

    if (headers)
      Object.assign(config.headers, headers)

    return config
  }

  _btoa(str) {
    try {
      return btoa(str)
    } catch (err) {
      return Buffer.from(str).toString('base64')
    }
  }

}

DictaDataAPI.baseURL = "https://api.dictadata.org"
DictaDataAPI.$user = null
