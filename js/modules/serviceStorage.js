export const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

export const setStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const addTaskData = (key, task) => {
  const data = getStorage(key);
  data.push(task);
  setStorage(key, data);
};

export const removeStorage = (key, id) => {
  const data = getStorage(key);
  const newData = data.filter(item => item.id !== id);
  setStorage(key, newData);
};
