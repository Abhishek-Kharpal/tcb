export function getFromStorage(key: string) {
  return localStorage.getItem(key);
}

export function setInStorage(key: string, value: string) {
  return localStorage.setItem(key, value);
}

export function removeFromStorage(key: string) {
  return localStorage.removeItem(key);
}

export function clearStorage() {
  return localStorage.clear();
}

export function getOrSetInStorage(key: string, value: string) {
  const val = localStorage.getItem(key);
  if (val) {
    return val;
  } else {
    localStorage.setItem(key, value);
    return value;
  }
}
