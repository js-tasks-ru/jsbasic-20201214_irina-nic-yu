/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  let strByWords = str.split('-');
  let strByWordsCamelize = strByWords.map((item, index) => {

    if (index === 0) {
      return item;
    }

    return `${item[0].toUpperCase()}${item.slice(1)}`;
  });

  return strByWordsCamelize.join('');
}
