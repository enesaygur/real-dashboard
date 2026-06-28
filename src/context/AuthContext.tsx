import { createContext, useContext, useEffect, useState } from "react";

interface User {
  email: string;
}
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const savedAuth = localStorage.getItem("user");
    if (savedAuth) {
      setUser(JSON.parse(savedAuth));
    }
  }, []);
  const login = (email: string, password: string) => {
    const fakeUser = { email };
    setUser(fakeUser);
    localStorage.setItem("user", JSON.stringify(fakeUser));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
