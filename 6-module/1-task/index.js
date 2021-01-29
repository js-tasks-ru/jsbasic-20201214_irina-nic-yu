/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: '',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
import createElement from '../../assets/lib/create-element.js';
export default class UserTable {

  constructor(rows) {
    this._users = rows;
    this._headings = ['Имя', 'Возраст', 'Зарплата', 'Город', ''];
    this._container = null;
    this._onClick = this._onClick.bind(this);
    this._render();
  }

  get elem() {
    return this._container;
  }

  _tableTemplate({headings = [], rows = []} = {}) {
    return `
    <table data-component="hidingRowsTable">
    <thead>
    ${headings}
    </thead>
    <tbody>${rows}</tbody>
    </table>`;
  }

  _rowTemplate(user) {
    return `<tr>
    <td>${user.name}</td>
    <td>${user.age}</td>
    <td>${user.salary}</td>
    <td>${user.city}</td>
    <td><button data-component='hideButton'>X</button></td>
    </tr>`;
  }

  _createHeadings({headings = []} = {}) {
    return `<tr>${headings.map((item) => `<th>${item}</th>`).join('')}</tr>`;
  }
  _createRows({rows = []} = {}) {
    return rows.map(this._rowTemplate).join('');
  }

  _onClick(event) {
    let target = event.target;
    let row = target.closest('tr');

    if (target.dataset.component != 'hideButton') {
      return;
    }
    row.remove();
  }

  _render() {
    const template = this._tableTemplate({
      headings: this._createHeadings({headings: this._headings}),
      rows: this._createRows({rows: this._users})
    });

    this._container = createElement(template);
    this._container.addEventListener('click', this._onClick);
  }

}

