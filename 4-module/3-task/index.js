/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {

  function checkAvailableData(row) {
    let isAvailable = row.children[3].dataset.available;

    if (isAvailable === 'true') {
      row.classList.add('available');
    } else if (isAvailable === 'false') {
      row.classList.add('unavailable');
    } else {
      row.setAttribute('hidden', '');
    }
  }

  function checkGender(row) {
    let gender = row.children[2].innerHTML;

    if (gender === 'm') {
      row.classList.add('male');
    } else if (gender === 'f') {
      row.classList.add('female');
    }
  }

  function checkAge(row) {
    let age = Number(row.children[1].innerHTML);

    if (age < 18) {
      row.style.textDecoration = 'line-through';
    }
  }

  let teachersCollection = Array.from(table.tBodies[0].children);

  teachersCollection.forEach((teacher) => {
    checkAvailableData(teacher);
    checkGender(teacher);
    checkAge(teacher);
  });

}
