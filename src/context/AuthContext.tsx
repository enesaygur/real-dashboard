import { createContext, useContext, useEffect, useState } from "react";
import { fakeLogin } from "../api/authApi";
import { saveUser, getUser, clearUser } from "./../utils/authStorage";

interface User {
  email: string;
}
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const savedUser = getUser();
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fakeLogin(email, password);
      const fakeUser = { email: response.email };
      setUser(fakeUser);
      saveUser(fakeUser);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    setUser(null);
    clearUser();
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
