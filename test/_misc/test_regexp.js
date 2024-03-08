
let footnote = "[footnote text](https://dev.dictadata.net)";

function parseFootnote(footnote) {

  let results = footnote.match(/\[(.*)\](?:\((.*)\))*/)
  console.log(results)

  let foot = {
    note: results ? results[ 1 ] : footnote,
    link: results ? results[ 2 ] : undefined
  }

  return foot;
}

console.log(parseFootnote(footnote));
console.log(parseFootnote("hello world"));
console.log(parseFootnote("[hello] world"));
