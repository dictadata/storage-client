/**
 * test/storage/recall.js
 */
"use strict"

import DictaDataAPI from "../../lib/dictaDataAPI.js"
import Storage from "../../lib/storage.js"
import $user from "../../lib/user.js"

const smt_urn = ":es_foo_schema"

console.log("=== tests: storage recall")

async function test_1(keyValue) {
  console.log("recallFoo")
  let retCode = 0

  try {
    let storage = new Storage({
      baseURL: "http://dev.dictadata.org:8089"
    })

    // console.log('call storage.retrieve')
    let pattern = {
      "match": {
      },
      "count": 100
    }
    if (keyValue === 'first')
      pattern.match[ "key" ] = keyValue
    else
      pattern.match[ "Foo" ] = keyValue
      
    let constructs = await storage.recall(smt_urn, pattern)
    console.log(JSON.stringify(constructs))
  }
  catch (err) {
    console.log(err)
    retCode = 1
  }

  return retCode
}

(async () => {
  if (await test_1('first')) return
  if (await test_1('seventh')) return
  if (await test_1('twenty')) return
})()
