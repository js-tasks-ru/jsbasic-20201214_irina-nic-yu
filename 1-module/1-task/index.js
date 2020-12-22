/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  let calculatedFactorial = 1;

  for (let i = 1; i < (n + 1); i++) {
    calculatedFactorial *= i;
  }

  return calculatedFactorial;
}
