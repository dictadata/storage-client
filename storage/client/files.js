/**
 * storage/client/lib/import.js
 */

import StorageAPI from './storage-api.js'
import Roles from './types/roles.js'

export default class Files extends StorageAPI {

  constructor(options) {
    super(options)
  }

  getFile(url) {
    //console.log("getFile")

    return new Promise((resolve, reject) => {
      if (!this.$user.isAuthorized([ Roles.Guest, Roles.User ])) {
        console.warn("not authorized")
        reject(new Error('Not Authorized'))
        return
      }

      let config = this.axiosConfig()

      this.axios.get(url, config)
        .then(res => {
          //console.log("api returned")
          //console.log(res)
          resolve(res.data)
        })
        .catch(err => {
          console.warn('api failed')
          console.warn(err.message)
          reject(err)
        })
    })
  }

  putFile(url, data) {
    //console.log("putFile")

    return new Promise((resolve, reject) => {
      if (!this.$user.isAuthorized([ Roles.User, Roles.ETL ])) {
        console.warn("not authorized")
        reject(new Error('Not Authorized'))
        return
      }

      let config = this.axiosConfig(null, {
        "Content-Type": 'multipart/form-data'
      })

      this.axios.put('/files', data, config)
        .then(res => {
          //console.log("api returned")
          //console.log(res)
          resolve(res.data)
        })
        .catch(err => {
          console.warn('api failed')
          console.warn(err.message)
          reject(err)
        })
    })
  }

  upload(formData) {
    //console.log("upload")

    return new Promise((resolve, reject) => {
      if (!this.$user.isAuthorized([ Roles.User, Roles.ETL ])) {
        console.warn("not authorized")
        reject(new Error('Not Authorized'))
        return
      }

      let config = this.axiosConfig(null, {
        "Content-Type": 'multipart/form-data'
      })

      this.axios.post('/files', formData, config)
        .then(res => {
          //console.log("api returned")
          //console.log(res)
          resolve(res.data)
        })
        .catch(err => {
          console.warn('api failed')
          console.warn(err.message)
          reject(err)
        })
    })
  }

}
