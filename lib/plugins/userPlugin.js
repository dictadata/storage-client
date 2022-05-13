/**
 * userPlugin.js
 *
 * Global account object.
 * Access in Vue components with this.$user
 */

import $user from '../user.js'

export const UserPlugin = {

  install(app, options) {
    if (options && options.account)
      $user.copy(options.account)
    // Vue.js 2
    app.prototype.$user = $user
  }

}

export default UserPlugin
