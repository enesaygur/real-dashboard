export interface User {
  email: string;
  role: "Admin" | "User";
}

export interface AuthState {
  user: User | null;
  loading: boolean;
}

export type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_ERROR" }
  | { type: "LOGOUT" }
  | { type: "INIT_FINISH" };
