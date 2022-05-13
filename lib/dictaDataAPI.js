/**
 * /client/dictaDataAPI.js
 *
 * Create an axios instance pointing to a dicta API server
 * with user authorization credentials.
 *
 */

import axios from 'axios'
import Account from './account.js'
import $user from './user.js'

export default class DictaDataAPI {

  constructor(options) {
    this.options = options || {}

    // can override user for this connection
    let user = this.options.user || this.options.account
    if (user) {
      if (user instanceof Account)
        this.user = user
      else
        this.user = new Account(user)
    }
    else
      this.user = $user

    this.axios = axios
  }

  get config() {
    let config = {
      baseURL: this.options.baseURL || DictaDataAPI.baseURL,
      headers: {
        Authorization: 'Basic ' + this._btoa(this.user.userid + ':' + this.user.password)
      }
    }
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
DictaDataAPI.$user = $user
