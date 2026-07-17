import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";
import styles from "./Header.module.css";
import { useTheme } from "../../context/theme/ThemeContext";
function Header() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <h3>Real World Dashboard</h3>
      <span>{user?.email}</span>
      <button onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Logout
      </button>
    </header>
  );
}

export default Header;
