/**
 * test/settings/settings.js
 */
"use strict"

import { login } from "../lib/client.js"
import Settings from "../../storage/client/settings.js"

async function testSettings() {

  try {
    let settings = new Settings()

    let key = 'words'
    let props = {
      hello: 'world',
      guden: 'dach',
      languages: [ 'english', 'german' ]
    }

    let results;
    //console.log("--- recall settings")
    //console.log("key: " + key)
    results = await settings.recall(key)
    //console.log("results: " + JSON.stringify(results))

    //console.log("--- store settings")
    //console.log("key: " + key + " props: " + JSON.stringify(props))
    results = await settings.store(key, props)
    //console.log("results: " + JSON.stringify(results))

    //console.log("--- recall settings")
    //console.log("key: " + key)
    results = await settings.recall(key)
    //console.log("results: " + JSON.stringify(results))
  }
  catch (err) {
    console.warn(err.message)
    return
  }
}

// test runner
(async () => {
  //console.log("storage-client tests")
  await login()
  await testSettings()
  //console.log("--- done")
})()
