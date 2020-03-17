/**
 * services/user.js
 */

const Roles = require('./roles')

module.exports = class User {

  constructor(userid='', password='') {
    this.clear(userid)
    this.password = password
  }

  clear(userid) {
    this.userid = userid
    this.password = ''
    this.roles = [Roles.Public]
    this.dateCreated = null
    this.lastLogin = null

    // state can be copied, but shouldn't be saved, updated or communicated
    this.state = {
      isAuthenticated: false
    }

    this.profile = {
      provider: '', // The provider with which the user authenticated (facebook, twitter, etc.).
      id: '', // A unique identifier for the user, as generated by the service provider.
      displayName: '', // The name of this user, suitable for display.
      name: {
        familyName: '', // The family name of this user, or "last name" in most Western languages.
        givenName: '', // The given name of this user, or "first name" in most Western languages.
        middleName: '' // The middle name of this user.
      },
      emails: [{
        value: '', // The actual email address.
        type: '' // The type of email address (home, work, etc.).
      }],
      photos: [{
        value: '' // The URL of the image.
      }]
    }

    this.settings = {
      prefix: '',
      homepage: '',
      sidebarColor: '',
      theme: ''
    }
  }

  /**
   * returns true if user is Authenticated i.e. logged in
   */
  isAuthenticated() {
    return this.state.isAuthenticated
  }

  /**
   * isAuthorized returns true if user has at least one of the requested role(s).
   * @param {*} role as a string or array of strings
   */
  isAuthorized(roles) {
    if (Array.isArray(roles)) {
      for (let i = 0; i < roles.length; i++)
        if (this.roles.includes(roles[i])) 
          return true
    } else if (roles)
      return this.roles.includes(roles)

    return false
  }

  copy(u2) {
    let u1 = this

    Object.keys(u2).forEach(function(key) {
      let t = typeof u2[key]

      if (key === 'roles') {
        u1.roles = u2.roles
      } else if (key === 'state') {
        u1.state = u2.state
      } else if (key === 'profile') {
        u1.profile = u2.profile
      } else if (key === 'settings') {
        u1.settings = u2.settings
      } else if (t !== "undefined" && t !== "function") {
        u1[key] = u2[key]
      }
    })
  }

  update(u2) {
    let u1 = this

    Object.keys(u2).forEach(function(key) {
      let t = typeof u2[key]

      if (key === 'userid' || key === 'password') {
        //
      } else if (key === 'roles') {
        u1.roles = u2.roles
      } else if (key === 'state') {
        //u1.state = u2.state
      } else if (key === 'profile') {
        u1.profile = u2.profile
      } else if (key === 'settings') {
        u1.merge(u1.settings, u2.settings)
      } else if (t !== "undefined" && t !== "function") {
        u1[key] = u2[key]
      }
    })
  }

  merge(u1,u2) {
    Object.keys(u2).forEach( function(key) {
      let t = typeof u2[key];
      if (t !== "undefined" && t !== "function") {
        u1[key] = u2[key];
      }
    });
  }

}