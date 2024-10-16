import { useEffect, useState } from "react";

export function useItemStorageState(key, defaultValue) {
  const [state, setState] = useState(() => {
    const savedState = window.localStorage.getItem(key);
    return savedState ? JSON.parse(savedState) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}