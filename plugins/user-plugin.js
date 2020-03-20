/**
 * user-plugin.js
 *
 * Global user object.
 * Access in Vue components with this.$user
 */

import { User } from '../client'

const userPlugin = {
  install(Vue, options) {
    var user = new User()
    if (options && options.user)
      user.copy(options.user)
    Vue.prototype.$user = user
  }
}

export default userPlugin
