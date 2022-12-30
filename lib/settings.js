/**
 * @dictadata/org/client/lib/settings.js
 */

import DictaDataAPI from './dictadata-api.js'
import Roles from './types/roles.js'
import StorageResults from './types/storage-results.js'

var isLocalStorage = storageAvailable('localStorage')

export default class Settings extends DictaDataAPI {

  constructor(options) {
    super(options)
  }

  recall(key) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.$user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      let settings
      if (isLocalStorage) {
        settings = window.localStorage.getItem(key)
        if (settings) {
          resolve(new StorageResults(0, "OK", JSON.parse(settings), key))
          return
        }
      }

      this.axios.get('/api/settings/' + key, this.axiosConfig())
        .then(response => {
          if (response.status === 200) {
            let results = response.data
            if (results.status !== 0)
              throw new Error(results.message)
            if (results.type !== 'map')
              throw new Error("invalid result type: " + results.type)

            settings = results.data[ key ]
            if (isLocalStorage)
              window.localStorage.setItem(key, JSON.stringify(settings))

            resolve(results)
          }
          else
            reject(response.statusText);
        })
        .catch(error => {
          // console.warn(error.message)
          reject(error)
        })
    })
  }

  store(key, settings) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.$user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      if (isLocalStorage)
        window.localStorage.setItem(key, JSON.stringify(settings))

      let config = this.axiosConfig(null, {
        "Content-Type": "application/json; charset=utf-8"
      })

      let body = {
        settings
      }

      this.axios.put('/api/settings/' + key, body, config)
        .then(response => {
          if (response.status === 200) {
            let results = response.data
            if (results.status !== 0)
              throw new Error(results.message)

            resolve(results)
          }
          else
            reject(response.statusText);
        })
        .catch(error => {
          // console.warn(error.message)
          reject(error)
        })
    })
  }

}

/**
 *
 * @param {String} type 'localStorage' or 'sessionStorage'
 * @returns true|false
 */
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
  let storage;
  try {
      storage = window[type];
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch (e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0);
  }
}
