/**
 * client/account.js
 */

import Roles from './roles.js'

export default class Account {

  constructor(user) {
    this.clear()
    if (user) {
      this.userid = user.userid
      this.password = user.password
    }
  }

  clear() {
    this.userid = ''
    this.password = ''
    this.roles = [ Roles.Public ]
    this.dateCreated = null
    this.dateUpdated = null
    this.lastLogin = null

    // state can be copied, but shouldn't be saved or serialized
    this._state = {
      isAuthenticated: false,
      isLocal: false
    }

    this.profile = {
      displayName: '', // The name of this user, suitable for display.
      familyName: '', // The family name of this user, or "last name" in most Western languages.
      givenName: '', // The given name of this user, or "first name" in most Western languages.
      email: '', // user email address.
      photoURL: '' // URL of image.
    }

    this.settings = {
      homepage: '',
      darkmode: '',
      theme: ''
    }
  }

  /**
   * returns true if user is Authenticated i.e. logged in
   */
  get isAuthenticated() {
    return (this._state && this._state.isAuthenticated) || false
  }
  set isAuthenticated(value) {
    if (!this._state)
      this._state = {}
    this._state.isAuthenticated = value
  }

  get isLocal() {
    return (this._state && this._state.isLocal) || false
  }
  set isLocal(value) {
    if (!this._state)
      this._state = {}
    this._state.isLocal = value
  }

  /**
   * isAuthorized returns true if user has at least one of the requested role(s).
   * @param {*} role as a string or array of strings
   */
  isAuthorized(roles) {
    if (Array.isArray(roles)) {
      for (let i = 0; i < roles.length; i++) {
        if (this.roles.includes(roles[ i ]))
          return true
      }
    } else if (roles)
      return this.roles.includes(roles)

    return false
  }

  /**
   * helper for accessing state
   */
  get state() {
    if (!this._state)
      this._state = {}
    return this._state
  }

  // shallow copy of all non-function properties
  _copy(u2) {
    let u1 = this

    Object.keys(u2).forEach(function (key) {
      let t = typeof u2[ key ]
      if (t !== "undefined" && t !== "function")
        u1[ key ] = u2[ key ]
    })
  }

  // shallow copy of non-function properties
  // excluding userid, password, state
  _update(u2) {
    let u1 = this

    Object.keys(u2).forEach(function (key) {
      let t = typeof u2[ key ]

      if (key === 'userid' || key === 'password' || key === '_state') {
        //
      } else if (t !== "undefined" && t !== "function")
        u1[ key ] = u2[ key ]
    })
  }

    /**
   * Sanitized copy of account properties for sending to client apps.
   * Stripped of password, state, functions and undefined values.
   */
    _sanitize() {
      let a1 = {};
      let a2 = this;

      Object.keys(this).forEach(function (key) {
        let t = typeof a2[key];

        if (key === 'password' || key === 'state') {
          // skip
        } else if (t !== "undefined" && t !== "function") {
          a1[key] = a2[key];
        }
      });

      return a1;
    }
}
