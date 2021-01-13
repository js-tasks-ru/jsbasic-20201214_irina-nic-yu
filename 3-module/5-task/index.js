/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  let result = {
    min: 0,
    max: 0,
  };
  const SEPARATOR_RE = /[\s,]/;

  let numbersFromStr = str
    .split(SEPARATOR_RE)
    .filter(item => Number(item))
    .map(item => Number(item))
    .sort((a, b) => a - b);


  result.min = numbersFromStr[0];
  result.max = numbersFromStr[numbersFromStr.length - 1];
  
  let {min, max} = result;

  return {min, max};
}
