/**
 * test/main.js
 */

const client = require('../index');

console.log("dicta.io-client tests");
console.log(process.env.NODE_ENV);
console.log(process.env.VUE_APP_DICTA_API);

/**
 * Account
 */
async function accountTests() {
  console.log("===== Accounts =====")

  let user = new client.User('tester', 'testy')

  console.log("=== account register test");
  try {
    let account = new client.Account(user)
    let results = await account.register()
    console.log("results: " + JSON.stringify(results, null, "  "))
  }
  catch (err) {
    console.log(err);
  }

  console.log("=== account login test");
  try {
    let account = new client.Account(user)
    let results = await account.login()
    console.log("results: " + JSON.stringify(results, null, "  "))
  }
  catch (err) {
    console.log(err);
  }

  console.log("=== account store test");
  try {
    let account = new client.Account(user)
    let results = await account.store()
    console.log("results: " + JSON.stringify(results, null, "  "))
  }
  catch (err) {
    console.log(err);
  }

  console.log("=== account dull test");
  try {
    let account = new client.Account(user)
    let results = await account.dull()
    console.log("results: " + JSON.stringify(results, null, "  "))
  }
  catch (err) {
    console.log(err);
  }
}

/**
 * Docs
 */
async function docsTests() {
  console.log("===== Docs =====")

  let user = new client.User('editor', 'editor')
  let account = new client.Account(user)
  let result = await account.login()
  console.log("login: " + result)

  console.log("=== docs store test");
  try {
    let doc = client.Docs.newDoc()
    doc["docid"] = 'my new doc'
    doc["title"] = 'my new doc'
    doc['byline'] = 'drew'
    doc["article"] = 'some text in my new doc'

    let docs = new client.Docs(user)
    let results = await docs.storeDoc(doc)
    console.log("results: " + JSON.stringify(results, null, "  "))
  }
  catch (err) {
    console.log(err);
  }

  console.log("=== docs recall test");
  try {
    let docs = new client.Docs(user)
    let results = await docs.recallDoc("my new doc")
    console.log("results: " + JSON.stringify(results, null, "  "))
  }
  catch (err) {
    console.log(err);
  }

  console.log("=== docs retrieve test");
  try {
    let pattern = {
      match: {
        byline: 'drew'
      }
    }
    let docs = new client.Docs(user)
    let results = await docs.retrieveDocs(pattern)
    console.log("results: " + JSON.stringify(results, null, "  "))
  }
  catch (err) {
    console.log(err);
  }

}


async function main() {
  // test runners
  //await accountTests();
  await docsTests();
}

main();
