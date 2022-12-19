/**
 * test/storage/recall.js
 */
"use strict"

import DictaDataAPI from "../../lib/dictadata-api.js"
import Storage from "../../lib/storage.js"
import $user from "../../lib/user.js"

console.log("=== tests: storage recall")

function replacer(key, value) {
  if (value instanceof Map) {
    return Object.fromEntries(value.entries())
  } else if (value instanceof Set) {
    return [ ...value ]
  } else {
    return value;
  }
}

async function test_recall(smt_urn, keyValue) {
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

    console.log(smt_urn + " " + JSON.stringify(constructs, replacer))
  }
  catch (err) {
    console.log(err)
    retCode = 1
  }

  return retCode
}

(async () => {
  if (await test_recall(":es_foo_schema", 'first')) return
  if (await test_recall(":es_foo_schema", 'seventh')) return
  if (await test_recall(":es_foo_schema", 'twenty')) return

  if (await test_recall(":mssql_foo_schema", 'second')) return
  if (await test_recall(":mysql_foo_schema", 'second')) return
})()
