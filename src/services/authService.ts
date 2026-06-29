import { fakeLogin } from "../api/authApi";
import { clearUser, getUser, saveUser } from "../utils/authStorage";
export interface User {
  email: string;
}

export async function loginService(email: string, password: string) {
  const response = await fakeLogin(email, password);
  const user: User = { email: response.email };
  saveUser(user);
  return user;
}

export function logoutService() {
  clearUser();
}

export function getStoredUser() {
  return getUser();
}
