export const setStorage = (title, value) => localStorage.setItem(title, value);

export const getStorage = (title) => localStorage.getItem(title);

export const setJson = (title, value) => (
  localStorage.setItem(title, JSON.stringify(value)));
