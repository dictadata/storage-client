/**
 * dictadata-client/docs.js
 */

const dictaAPI = require('./dictaAPI')
const Roles = require('./roles')

module.exports = class Docs {

  constructor(user) {
    this.user = user
  }

  // get the encoding and create an object from the engram.fields
  static newDoc() {
    return {
      "docid": '',
      "title": '',
      "compilation": [],
      "tags": [],
      "tagline": '',
      "byline": '',
      "dateline": '',
      "imageURL": '',
      "article": '',
      "author": '',
      "dateCreated": null,
      "dateUpdated": null
    }
  }

  storeDoc(doc) {
    return new Promise((resolve, reject) => {
      if (!this.user.isAuthorized(Roles.Editor)) {
        reject(new Error('Not Authorized'))
        return
      }

      let body = {
        data: doc
      }

      dictaAPI(this.user).put('/api/docs/' + encodeURIComponent(doc.docid), body)
        .then((response) => {
          //console.log(response)
          let results = response.data;
          if (results.result === 'ok')
            resolve(results.data)
          else
            reject(results.result);
        })
        .catch((error) => {
          reject(error.message)
        });

    })
  }

  recallDoc(docid) {
    return new Promise((resolve, reject) => {
      if (!(this.user.isAuthorized(Roles.Docs) || this.user.isAuthorized(Roles.User)) ) {
        reject(new Error('Not Authorized'))
        return
      }

      dictaAPI(this.user).get('/api/docs/' + encodeURIComponent(docid))
        .then((response) => {
          //console.log(response);
          let results = response.data;
          if (results.result === 'ok')
            resolve(results.data[docid])
          else
            reject(results.result);
        })
        .catch((error) => {
          reject(error.message);
        });

    })
  }

  dullDoc(docid) {
    return new Promise((resolve, reject) => {
      if (!this.user.isAuthorized(Roles.Editor)) {
        reject(new Error('Not Authorized'))
        return
      }

      dictaAPI(this.user).delete('/api/docs/' + encodeURIComponent(docid))
        .then((response) => {
          //console.log(response);
          let result = response.data;
          if (result === 'ok')
            resolve(result)
          else
            reject(result);
        })
        .catch((error) => {
          reject(error.message);
        });

    })
  }

  retrieveDocs(pattern) {
    return new Promise((resolve, reject) => {
      if (!(this.user.isAuthorized(Roles.Docs) || this.user.isAuthorized(Roles.User)) ) {
        reject(new Error('Not Authorized'))
        return
      }

      let body = {
        pattern: pattern.pattern || pattern
      }

      dictaAPI(this.user).post('/api/docs', body)
        .then((response) => {
          //console.log("docs: ", JSON.stringify(response.data));
          let results = response.data;
          if (results.result === 'ok')
            resolve(results.data)
          else
            reject(results.result);
        })
        .catch((error) => {
          reject(error.message);
        });

    })
  }

}
