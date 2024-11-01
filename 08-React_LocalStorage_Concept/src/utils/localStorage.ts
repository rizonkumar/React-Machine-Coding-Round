export function setItem(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
}

export function getItem(key: string) {
  try {
    const item = window.localStorage.getItem(key);
    console.log("Item", item);
    return item ? JSON.parse(item) : undefined;
  } catch (error) {
    console.error(error);
  }
}
