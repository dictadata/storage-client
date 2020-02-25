/**
 * dicta.io-client/docs.js
 */

const dictaAPI = require('./dictaAPI')
const Roles = require('./roles')

module.exports = class Docs {

  constructor(user) {
    this.user = user
  }

  static newDoc() {
    return {
      "docid": '',
      "title": '',
      "compilation": [],
      "author": '',
      "byline": '',
      "dateline": '',
      "context": [],
      "article": ''
    }
  }

  retrieveDocs (pattern) {
    return new Promise((resolve, reject) => {
      if (!this.user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      dictaAPI(this.user).post('/api/docs', pattern)
      .then( (response) => {
        //console.log(response);
        if (response.data.result === 'ok')
          resolve(response.data.docs)
        else
          reject(response.data.result);
      })
      .catch( (error) => {
        reject(error.message);
      });

    })
  }

  recallDoc(docid) {
    return new Promise((resolve, reject) => {
      if (!this.user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      dictaAPI(this.user).get('/api/docs/' + encodeURIComponent(docid))
      .then( (response) => {
        //console.log(response);
        if (response.data.result === 'ok')
          resolve(response.data.doc)
        else
          reject(response.data.result);
      })
      .catch( (error) => {
        reject(error.message);
      });

    })
  }

  storeDoc(doc) {
    return new Promise((resolve, reject) => {
      if (!this.user.isAuthorized(Roles.Editor)) {
        reject(new Error('Not Authorized'))
        return
      }

      dictaAPI(this.user).put('/api/docs/' + encodeURIComponent(doc.docid), {doc: doc})
      .then( (response) => {
        //console.log(response)
        resolve(response.data.result)
      })
      .catch( (error) => {
        reject(error.message)
      });

    })
  }

}
