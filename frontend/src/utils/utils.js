export function getLocalStorageState(key) {
  const savedState = window.localStorage.getItem(key);
  try {
    return savedState ? JSON.parse(savedState) : null;
  } catch (e) {
    console.error(e);
    return null;
  }
}
