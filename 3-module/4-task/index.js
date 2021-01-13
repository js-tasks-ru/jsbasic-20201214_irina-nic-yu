/**
 * showSalary
 * @param {Array} users - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(users, age) {
  let listOfUsers = users
    .filter(({age: userAge}) => userAge <= age)
    .map(({name, balance}) => `${name}, ${balance}`);
  
  return listOfUsers.join('\n');
}
