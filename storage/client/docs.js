/**
 * storage/client/lib/docs.js
 */

import StorageAPI from './storage-api.js'
import Roles from './types/roles.js'

export default class Docs extends StorageAPI {

  constructor(options) {
    super(options)
  }

  // get the encoding and create an object from the engram.fields
  static initDoc(doc) {
    doc[ "docid" ] = '',
      doc[ "title" ] = '',
      doc[ "compilation" ] = [],
      doc[ "tags" ] = [],
      doc[ "tagline" ] = '',
      doc[ "byline" ] = '',
      doc[ "dateline" ] = '',
      doc[ "imageURL" ] = '',
      doc[ "article" ] = '',
      doc[ "author" ] = '',
      doc[ "dateCreated" ] = null,
      doc[ "dateUpdated" ] = null
  }

  storeDoc(doc) {
    return new Promise((resolve, reject) => {
      if (!this.$user.isAuthorized(Roles.Editor)) {
        reject(new Error('Not Authorized'))
        return
      }

      let config = this.axiosConfig(null, {
        "Content-Type": "application/json; charset=utf-8"
      })

      let body = {
        data: doc
      }

      this.axios.put('/api/docs/' + encodeURIComponent(doc.docid), body, config)
        .then((res) => {
          //console.log(res)
          if (res.status === 200)
            resolve(res.data)
          else
            reject(res.statusText)
        })
        .catch((error) => {
          reject(error.message)
        })
    })
  }

  recallDoc(docid) {
    return new Promise((resolve, reject) => {
      if (!(this.$user.isAuthorized([ Roles.Docs, Roles.User ]))) {
        reject(new Error('Not Authorized'))
        return
      }

      this.axios.get('/api/docs/' + encodeURIComponent(docid), this.axiosConfig())
        .then((res) => {
          //console.log(res);
          if (res.status === 200)
            resolve(res.data[ docid ])
          else
            reject(res.statusText)
        })
        .catch((error) => {
          reject(error.message)
        })
    })
  }

  dullDoc(docid) {
    return new Promise((resolve, reject) => {
      if (!this.$user.isAuthorized(Roles.Editor)) {
        reject(new Error('Not Authorized'))
        return
      }

      this.axios.delete('/api/docs/' + encodeURIComponent(docid), this.axiosConfig())
        .then((res) => {
          //console.log(res);
          let result = res.data
          if (result === 'ok')
            resolve(result)
          else
            reject(result)
        })
        .catch((error) => {
          reject(error.message)
        })
    })
  }

  retrieveDocs(pattern) {
    return new Promise((resolve, reject) => {
      if (!(this.$user.isAuthorized([ Roles.Docs, Roles.User ]))) {
        reject(new Error('Not Authorized'))
        return
      }

      let config = this.axiosConfig(null, {
        "Content-Type": "application/json; charset=utf-8"
      })

      let body = {
        pattern: pattern.pattern || pattern
      }

      this.axios.post('/api/docs', body, config)
        .then((res) => {
          //console.log("docs: ", JSON.stringify(res.data));
          if (res.status === 200)
            resolve(res.data)
          else
            reject(res.statusText)
        })
        .catch((error) => {
          reject(error.message)
        })
    })
  }

}
