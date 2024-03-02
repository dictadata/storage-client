/**
 * client/utils/formatData.js
 */

/**
 *
 * @param {*} sdate
 * @param {*} size
 * @returns
 */
export default function formatDate(sdate, size) {
  let ascii_space = ' '
  let utf8_space = '\u00A0'

  if (!sdate)
    return ""
  var tdate = new Date(sdate)
  if (!size)
    size = 20  // sans milliseconds

  let ds = tdate.getFullYear().toString()
  if (size > 4)
    ds += '-' + (tdate.getMonth() + 1).toString().padStart(2, "0")
  if (size > 7)
    ds += '-' + tdate.getDate().toString().padStart(2, "0")
  if (size > 10) {
    ds += ascii_space + tdate.getHours().toString().padStart(2, "0")
    ds += ':' + tdate.getMinutes().toString().padStart(2, "0")
    ds += ':' + tdate.getSeconds().toString().padStart(2, "0")
  }
  if (size > 20)
    ds += '.' + tdate.getMilliseconds().toString().padStart(3, "0")

  return ds
}
