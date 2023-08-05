import * as create from './createElements.js';

export const renderToDoApp = (app, login) => {
  const title = create.createTitle(login);
  const form = create.createForm();
  const input = create.createInput();

  const buttonGroup = create.createButtonsGroup([
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

  const tableWrapper = create.createTableWrapper();
  const table = create.createTable();

  tableWrapper.append(table);

  app.append(title, form, tableWrapper);

  return {
    form,
    btnAdd: buttonGroup.btns[0],
    list: table.tbody,
  };
};

export const renderTask = (elem, data) => {
  const allRow = data.map(create.createRow);
  elem.append(...allRow);
};
