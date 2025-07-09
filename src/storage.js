const storage = window.localStorage;

export const setItem = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Storage set srror : ", e);
  }
};

export const getItem = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(key);
    if (storedValue) {
      //todos가 이미 존재하면 있는 거 반환
      return JSON.parse(storedValue);
    }

    setItem(key, defaultValue); //아니면 초기값으로 설정 후 반환
    return defaultValue;
  } catch (e) {
    console.error("Storage get error : ", e);
    return defaultValue;
  }
};
