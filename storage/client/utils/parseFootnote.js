
// storage/utils/parseFootnote
"use strict";

/**
 *
 * @param {String} footnote
 * @returns Object with properties note and link, { note: "", link: "" }
 */
export default function parseFootnote(footnote) {

  let results = footnote.match(/\[(.*)\](?:\((.*)\))*/)

  let foot = {
    note: results ? results[ 1 ] : footnote,
    link: results ? results[ 2 ] : undefined
  }

  return foot;
}
