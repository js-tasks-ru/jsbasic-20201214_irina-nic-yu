/**
 * @param {HTMLTableElement} table
 * @return {void}
 */
function makeDiagonalRed(table) {
  let cell;

  [...table.rows].forEach((row, index) => {
    cell = row.cells[index];
    cell.style.backgroundColor = 'red';
  });

}