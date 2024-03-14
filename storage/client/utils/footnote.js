
// storage/utils/footnote
"use strict";

/**
 *
 * @param {String} footnote
 * @returns Object with properties note and link, { note: "", link: "" }
 */
export function parse(footnote) {

  let results = footnote.match(/\[(.*)\](?:\((.*)\))*/)

  let foot = {
    note: results ? results[ 1 ] : footnote,
    link: results ? results[ 2 ] : undefined
  }

  return foot;
}

/**
 *
 * @param {String} footnote
 * @returns Object with properties note and link, { note: "", link: "" }
 */
export function text(footnote) {

  let results = footnote.match(/\[(.*)\](?:\((.*)\))*/)

  return results && results.length > 1 ? results[ 1 ] : footnote;
}

/**
 *
 * @param {String} footnote
 * @returns Object with properties note and link, { note: "", link: "" }
 */
export function hyperlink(footnote) {

  let results = footnote.match(/\[(.*)\](?:\((.*)\))*/)

  return results && results.length > 2 ? results[ 2 ] : "";
}

export default {
  parse,
  text,
  hyperlink
}
