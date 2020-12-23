/**
 * truncate
 * @param {string} str
 * @param {number} maxlength
 * @returns {string}
 */
function truncate(str, maxlength) {
  if (str.length > maxlength) {
    return (`${str.slice(0, maxlength - 1)}\u2026`);
  }

  return str;
}
