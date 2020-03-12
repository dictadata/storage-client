/**
 * user-plugin.js
 *
 * Global user object.
 * Access in Vue components with this.$user
 */

import { User } from '../lib'

const userPlugin = {
  install(Vue) {
    var user = new User()
    Vue.prototype.$user = user
  }
}

export default userPlugin
