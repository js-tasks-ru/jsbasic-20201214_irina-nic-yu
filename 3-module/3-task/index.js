/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  let strByWords = str.split('-');
  let [firstWord] = strByWords;
  let strByWordsCamelize = strByWords.map(item => {

    if (item === firstWord) {
      return item;
    }

    return `${item[0].toUpperCase()}${item.slice(1)}`;
  });

  return strByWordsCamelize.join('');
}
