/**
 * storage/client/lib/storage-api.js
 *
 * Create an axios instance pointing to a dictadata/storage-node API server
 * with user authorization credentials.
 *
 */

import axios from 'axios'

export default class StorageAPI {

  constructor(options) {
    this.options = options || {}

    this.$user = StorageAPI.$user || { userid: "guest", password: "guest", isAuthenticated: false, isLocal: true }
    //console.log(this.$user.userid)

    this.axios = axios
  }

  axiosConfig(user, headers) {
    user = user || this.$user;

    let config = {
      baseURL: this.options.baseURL || StorageAPI.baseURL,
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

StorageAPI.baseURL = "https://api.dictadata.net"
StorageAPI.$user = null
