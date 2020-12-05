/**
 * ucFirst
 * @param {string} str
 * @returns {string}
 */
function ucFirst(str) {
  if (str.length == 0) {
    return str;
  }

  return str.replace(str[0], str[0].toUpperCase());
}
