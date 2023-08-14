const STORAGE_KEY = 'local_files_list';
const storage = window.localStorage;

const setItem = (key: string, value: any) => {
  try {
    storage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.error(err);
  }
};

const getItem = (key: string): any => {
  try {
    const value = storage.getItem(key);
    return JSON.parse(value as string);
  } catch (err) {
    console.log(err);
    return '';
  }
};

export const queryStorage = (key = STORAGE_KEY): any[] => {
  return getItem(key) as [] || [];
};

export const generateKey = (): number => {
  return Date.now();
};

export const read = (key: string | number): string => {
  try {
    const store = queryStorage();
    const result = store.filter((each) => each.id === key);
    return result[0].code || '';
  } catch (err) {
    console.error(err);
    return ''
  }
};

export const remove = (key: string | number): boolean => {
  try {
    const store = queryStorage();
    const result = store.filter((each) => each.id !== key);
    setItem(STORAGE_KEY, result);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const save = (key: string | number, value: string): boolean => {
  try {
    const store = queryStorage();
    remove(key);
    store.push({ id: key, code: value });
    setItem(STORAGE_KEY, store);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
