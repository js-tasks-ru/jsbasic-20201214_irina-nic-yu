/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  let count = 1;

  for (let i = 1; i < (n + 1); i++) {
    count *= i;
  }

  return count;
}
