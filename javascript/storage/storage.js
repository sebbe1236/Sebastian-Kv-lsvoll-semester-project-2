export const listKey = "list";
const userToken = "token";
const userKey = "user";
export function retriveFromStorage() {
  const currentList = localStorage.getItem(listKey);
  if (!currentList) {
    return [];
  }
  return JSON.parse(currentList);
}

export function saveList(saveListItem) {
  localStorage.setItem(listKey, JSON.stringify(saveListItem));
}

//JWT token and user save to storage functions for login

export function savingToken(token) {
  savingtoStorage(userToken, token);
}

export function fetchToken() {
  return getUserFromStorage(userToken);
}

export function saveUsers(user) {
  savingtoStorage(userKey, user);
}

export function fetchUsername() {
  const user = getUserFromStorage(userKey);
  if (user) {
    return user.username;
  }
  return null;
}

function savingtoStorage(keys, savedValue) {
  localStorage.setItem(keys, JSON.stringify(savedValue));
}

function getUserFromStorage(key) {
  const userValue = localStorage.getItem(key);
  if (!userValue) {
    return [];
  }

  return JSON.parse(userValue);
}

export function clearUserkey() {
  localStorage.removeItem(userKey);
}

export function clearUsertaken() {
  localStorage.removeItem(userToken);
}
