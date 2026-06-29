import { createContext, useContext, useEffect, useState } from "react";
import { fakeLogin } from "../api/authApi";

interface User {
  email: string;
}
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const savedAuth = localStorage.getItem("user");
    if (savedAuth) {
      setUser(JSON.parse(savedAuth));
    }
  }, []);
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fakeLogin(email, password);
      const fakeUser = { email: response.email };
      setUser(fakeUser);
      localStorage.setItem("user", JSON.stringify(fakeUser));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
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
