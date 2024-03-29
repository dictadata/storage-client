
// storage/utils/footnote
"use strict";

/**
 *
 * @param {String} footnote
 * @returns Object with properties note and link, { note: "", link: "" }
 */
export function parse(footnote) {
  if (typeof footnote !== "string")
    return {};

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
 * @returns string with the text of the footnote
 */
export function text(footnote) {
  if (typeof footnote !== "string")
    return "";

  let results = footnote.match(/\[(.*)\](?:\((.*)\))*/)

  return results && results.length > 1 ? results[ 1 ] : footnote;
}

/**
 *
 * @param {String} footnote
 * @returns string with the footnote hyperlink
 */
export function hyperlink(footnote) {
  if (typeof footnote !== "string")
    return "";

  let results = footnote.match(/\[(.*)\](?:\((.*)\))*/)

  return results && results.length > 2 ? results[ 2 ] : "";
}

export default {
  parse,
  text,
  hyperlink
}
