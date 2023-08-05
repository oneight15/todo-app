export const login = prompt('Введите имя пользователя');

export const createTitle = (login) => {
  const title = document.createElement('h3');
  title.textContent = `Todo App. ${login}`;

  return title;
};

export const createForm = () => {
  const form = document.createElement('form');
  form.classList.add('d-flex', 'align-items-center', 'mb-3');

  return form;
};

export const createInput = () => {
  const label = document.createElement('label');
  label.classList.add('form-group', 'me-3', 'mb-0');
  label.insertAdjacentHTML('beforeend', `
    <input type="text" class="form-control"
      name="task" required placeholder="ввести задачу">
    <input type="hidden" name="id">
    <input type="hidden" name="status">
  `);

  return label;
};

export const createButtonsGroup = params => {
  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('btn-wrapper');

  const btns = params.map(({className, type, text}) => {
    const button = document.createElement('button');
    button.type = type;
    button.textContent = text;
    button.className = className;
    return button;
  });

  btnWrapper.append(...btns);

  return {
    btnWrapper,
    btns,
  };
};

export const createTableWrapper = () => {
  const tableWrapper = document.createElement('div');
  tableWrapper.classList.add('table-wrapper');

  return tableWrapper;
};

export const createTable = () => {
  const table = document.createElement('table');
  table.classList.add('table', 'table-hover', 'table-bordered');
  table.style.counterReset = 'trCount 0';

  const thead = document.createElement('thead');
  thead.insertAdjacentHTML('beforeend', `
    <tr>
      <th class="d-none">ID</th>
      <th>№</th>
      <th>Задача</th>
      <th>Статус</th>
      <th>Действия</th>
    </tr>
  `);

  const tbody = document.createElement('tbody');

  table.append(thead, tbody);
  table.tbody = tbody;

  return table;
};

export const createRow = ({id, task, status}) => {
  const tr = document.createElement('tr');
  tr.classList.add('task');

  const tdID = document.createElement('td');
  tdID.classList.add('task-id', 'd-none');
  tdID.textContent = id;

  const tdNum = document.createElement('td');
  tdNum.classList.add('task-num');

  const tdTask = document.createElement('td');
  tdTask.classList.add('task-name');
  tdTask.textContent = task;

  const tdStatus = document.createElement('td');
  tdStatus.classList.add('task-status');
  tdStatus.textContent = status;

  const tdMoves = document.createElement('td');
  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-danger me-2',
      type: 'button',
      text: 'Удалить',
    },
    {
      className: 'btn btn-success',
      type: 'button',
      text: 'Завершить',
    },
  ]);

  tdMoves.append(...buttonGroup.btns);

  if (status === 'Выполнена') {
    tr.classList.add('table-success');
    tdTask.classList.add('text-decoration-line-through');
  }

  tr.append(tdID, tdNum, tdTask, tdStatus, tdMoves);

  return tr;
};

export const countTask = () => {
  const style = document.createElement('style');
  const taskNum = document.querySelector('.task-num');

  // console.log(taskNum);

  style.textContent = `.task-num:before
    {
      content: counter(trCount);
      counter-increment: trCount;
    }"`;
  if (taskNum) {
    taskNum.append(style);
  }
};
