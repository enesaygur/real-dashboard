import { createContext, useContext, useEffect, useReducer } from "react";
import { authReducer } from "./authReducer";
import { AUTH_ACTIONS } from "./authActions";
import {
  getStoredUser,
  loginService,
  logoutService,
} from "../../services/authService";

interface User {
  email: string;
}
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const initialState = {
  user: null,
  loading: true,
};

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { user, loading } = state;
  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: user });
    }
    dispatch({ type: AUTH_ACTIONS.INIT_FINISH });
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    try {
      const user = await loginService(email, password);
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: user });
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.LOGIN_ERROR });
    }
  };

  const logout = () => {
    logoutService();
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export default AuthProvider;
