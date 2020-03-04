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
        let results = response.data;
        if (results.result === 'ok')
          resolve(results.data)
        else
          reject(results.result);
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
        let results = response.data;        
        if (results.result === 'ok')
          resolve(results.data[docid])
        else
          reject(results.result);
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

      dictaAPI(this.user).put('/api/docs/' + encodeURIComponent(doc.docid), {data: doc})
      .then( (response) => {
        //console.log(response)
        let results = response.data;
        if (results.result === 'ok')
          resolve(results.data)
        else
          reject(results.result);
      })
      .catch( (error) => {
        reject(error.message)
      });

    })
  }

}
