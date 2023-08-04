'use strict';


{
  const login = prompt('Введите имя пользователя');
  // const login = 'Пользователь';

  const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

  const setStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const addTaskData = (key, task) => {
    const data = getStorage(key);
    data.push(task);
    setStorage(key, data);
  };

  const removeStorage = (key, id) => {
    const data = getStorage(key);
    const newData = data.filter(item => item.id !== id);
    setStorage(key, newData);
  };

  const createTitle = (login) => {
    const title = document.createElement('h3');
    title.textContent = `Todo App. ${login}`;

    return title;
  };

  const createForm = () => {
    const form = document.createElement('form');
    form.classList.add('d-flex', 'align-items-center', 'mb-3');

    return form;
  };

  const createInput = () => {
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

  const createButtonsGroup = params => {
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

  const createTableWrapper = () => {
    const tableWrapper = document.createElement('div');
    tableWrapper.classList.add('table-wrapper');

    return tableWrapper;
  };

  const createTable = () => {
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

  const renderToDoApp = (app, login) => {
    const title = createTitle(login);
    const form = createForm();
    const input = createInput();

    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary me-3 disabled',
        type: 'submit',
        text: 'Сохранить',
      },
      {
        className: 'btn btn-warning',
        type: 'reset',
        text: 'Очистить',
      },
    ]);

    form.append(input, buttonGroup.btnWrapper);

    const tableWrapper = createTableWrapper();
    const table = createTable();

    tableWrapper.append(table);

    app.append(title, form, tableWrapper);

    return {
      form,
      btnAdd: buttonGroup.btns[0],
      list: table.tbody,
    };
  };

  const createRow = ({id, task, status}) => {
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

  const renderTask = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
  };

  const addTaskPage = (task, list) => {
    list.append(createRow(task));
  };

  const countTask = () => {
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

  const formControl = (form, btnAdd, list) => {
    form.addEventListener('input', e => {
      if (e.target.value !== '') {
        btnAdd.classList.remove('disabled');
      } else {
        btnAdd.classList.add('disabled');
      }
    });

    form.addEventListener('click', e => {
      if (e.target.matches('[type="reset"]')) {
        btnAdd.classList.add('disabled');
      }
    });

    form.addEventListener('submit', e => {
      e.preventDefault();

      const formData = new FormData(e.target);

      const newTask = Object.fromEntries(formData);
      newTask.id = Math.random().toString().substring(2, 10);
      newTask.status = 'В процессе';

      addTaskData(login, newTask);
      addTaskPage(newTask, list);
      countTask();
      form.reset();
      btnAdd.classList.add('disabled');
    });
  };

  const init = selectorApp => {
    const app = document.querySelector(selectorApp);
    app.classList.add('vh-100', 'w-100', 'd-flex', 'align-items-center',
        'justify-content-center', 'flex-column');

    const {
      form,
      btnAdd,
      list,
    } = renderToDoApp(app, login);

    const data = getStorage(login);

    formControl(form, btnAdd, list);
    renderTask(list, data);

    countTask();


    list.addEventListener('click', e => {
      const target = e.target;
      const parent = target.closest('.task');

      const idNum = parent.querySelector('.task-id');
      if (target.closest('.btn-success')) {
        parent.classList.add('table-success');
        parent.querySelector('.task-name')
            .classList.add('text-decoration-line-through');
        parent.querySelector('.task-status').textContent = 'Выполнена';
        const newData = getStorage(login);
        const poiskNushniID = item => item.id === idNum.textContent;
        const nushniID = newData.findIndex(poiskNushniID);
        console.log(newData[nushniID].status);
        newData[nushniID].status = 'Выполнена';
        console.log(newData[nushniID].status);
        setStorage(login, newData);
      }

      if (target.closest('.btn-danger')) {
        target.closest('.task').remove();
        countTask();
        removeStorage(login, idNum.textContent);
      }
    });
  };

  init('.app-container');
}
