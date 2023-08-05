import * as storage from './serviceStorage.js';
import * as create from './createElements.js';

export const addTaskPage = (task, list) => {
  list.append(create.createRow(task));
};

export const formControl = (form, btnAdd, list) => {
  form.addEventListener('input', e => {
    if (e.target.value.trim() !== '') {
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

    storage.addTaskData(create.login, newTask);
    addTaskPage(newTask, list);
    create.countTask();
    form.reset();
    btnAdd.classList.add('disabled');
  });
};

export const changeControl = (list, login) => {
  list.addEventListener('click', e => {
    const target = e.target;
    const parent = target.closest('.task');
    const idNum = parent.querySelector('.task-id');
    const newData = storage.getStorage(login);
    const poiskNushniID = item => item.id === idNum.textContent;
    const nushniID = newData.findIndex(poiskNushniID);

    if (target.closest('.btn-success')) {
      parent.classList.add('table-success');
      parent.querySelector('.task-name')
          .classList.add('text-decoration-line-through');

      parent.querySelector('.task-status').textContent = 'Выполнена';
      newData[nushniID].status = 'Выполнена';
      storage.setStorage(login, newData);
    }

    if (target.closest('.btn-danger')) {
      target.closest('.task').remove();
      create.countTask();
      storage.removeStorage(login, idNum.textContent);
    }
  });
};
