export function getLocalStorageState(key) {
  const savedState = window.localStorage.getItem(key);
  try {
    return savedState ? JSON.parse(savedState) : null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

let startDate = null;
let endDate = null;

export function getVoteStartDate() {
  if (startDate === null) {
    const localStorageItem = localStorage.getItem("overrideVoteStartDate");
    if (localStorageItem === null) {
      localStorage.setItem("overrideVoteStartDate", "");
    }
    if (localStorageItem !== "" && localStorageItem !== null) {
      startDate = new Date(localStorageItem);
    } else {
      startDate = new Date(import.meta.env.VITE_START_DATE);
    }
  }

  return startDate;
}

export function getVoteEndDate() {
  if (endDate === null) {
    const localStorageItem = localStorage.getItem("overrideVoteEndDate");

    if (localStorageItem === null) {
      localStorage.setItem("overrideVoteEndDate", "");
    }
    if (localStorageItem !== "" && localStorageItem !== null) {
      endDate = new Date(localStorageItem);
    } else {
      endDate = new Date(import.meta.env.VITE_END_DATE);
    }
  }

  return endDate;
}

export function canVote() {
  const now = new Date();
  if (now < startDate) {
    return false;
  }
  if (now > endDate) {
    return false;
  }

  return true;
}
