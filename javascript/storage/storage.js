export const listKey = "list";

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
