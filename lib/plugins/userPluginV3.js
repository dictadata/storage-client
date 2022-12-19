/**
 * userPlugin.js
 *
 * Global account object.
 * Access in Vue components with this.$user
 */

import $user from '../user.js'

export const UserPluginV3 = {

  install(app, options) {
    if (options && options.account)
      $user._copy(options.account)
    // Vue.js 3
    app.config.globalProperties.$user = $user
    app.provide('$user', app.config.globalProperties.$user)
  }

}

export default UserPluginV3
