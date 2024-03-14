import { footnote } from '../../storage/client/utils/index.js'

let note1 = "plain text"
let note2 = "[footnote text](footnote hyperlink)"
let note3 = "[footnote text](footnote hyperlink)extra stuff"

console.log("note1: " + note1);
console.log(footnote.parse(note1))
console.log(footnote.text(note1))
console.log(footnote.hyperlink(note1))
console.log("")

console.log("note2: " + note2);
console.log(footnote.parse(note2))
console.log(footnote.text(note2))
console.log(footnote.hyperlink(note2))
console.log("")

console.log("note3: " + note3);
console.log(footnote.parse(note3))
console.log(footnote.text(note3))
console.log(footnote.hyperlink(note3))
console.log("")
