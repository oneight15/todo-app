import * as render from './modules/render.js';
import * as storage from './modules/serviceStorage.js';
import * as control from './modules/controls.js';
import * as create from './modules/createElements.js';

const init = selectorApp => {
  const app = document.querySelector(selectorApp);
  app.classList.add('vh-100', 'w-100', 'd-flex', 'align-items-center',
      'justify-content-center', 'flex-column');

  const {
    form,
    btnAdd,
    list,
  } = render.renderToDoApp(app, create.login);

  const data = storage.getStorage(create.login);

  control.formControl(form, btnAdd, list);
  render.renderTask(list, data);
  create.countTask();
  control.changeControl(list, create.login);
};

init('.app-container');

