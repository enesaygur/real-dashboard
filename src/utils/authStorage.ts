const KEY = "user";
export function saveUser(user: unknown) {
  localStorage.setItem(KEY, JSON.stringify(user));
}

export function getUser() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
}

export function clearUser() {
  localStorage.removeItem(KEY);
}
