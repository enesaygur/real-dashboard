import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Header.module.css";
function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  return (
    <header className={styles.header}>
      <h3>Real World Dashboard</h3>
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
