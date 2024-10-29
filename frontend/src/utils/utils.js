export function getLocalStorageState(key) {
  const savedState = window.localStorage.getItem(key);
  return savedState ? JSON.parse(savedState) : null;
}