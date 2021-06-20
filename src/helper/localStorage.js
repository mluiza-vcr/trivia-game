export const setStorage = (title, value) => localStorage.setItem(title, value);

export const getStorage = (title) => localStorage.getItem(title);

export const setJson = (title, value) => (
  localStorage.setItem(title, JSON.stringify(value)));

export const getJson = (title) => JSON.parse(localStorage.getItem(title));

export const setStorageRanking = (ranking) => {
  if (getJson('ranking')) {
    const rankingStorage = getJson('ranking');
    const newRankingStorage = [...rankingStorage, ranking];
    setJson('ranking', newRankingStorage);
    return;
  }

  setJson('ranking', [ranking]);
};

export const getStorageRanking = (initialState, key) => {
  if (getJson(key)) return getJson(key);
  return initialState;
};
