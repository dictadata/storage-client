/**
 * @dictadata/org/client/lib/roles.js
 */
'use strict'

export const Roles = Object.freeze({
  // public routes
  Public: 'Public',   // authorizes routes for all requests, use ONLY for routes

  // user route roles
  Guest: 'Guest',     // used for limited functionality
  User: 'User',       // normal user
  Demo: 'Demo',       // special user for auto-login apps

  // advanced user route roles
  // only Admin can assign advanced roles
  Admin: 'Admin',     // accounts administrator
  Coder: 'Coder',     // engrams editor
  ETL: 'ETL',         // transfer user
  Monitor: 'Monitor', // status API's only

  // dicta data API roles
  Notify: 'Notify',
  Editor: "Editor",
  Docs: "Docs"
})

export default Roles
