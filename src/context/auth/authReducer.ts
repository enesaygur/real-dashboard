import type { AuthAction, AuthState } from "./authTypes";

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        loading: false,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
      };
    case "INIT_FINISH":
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
