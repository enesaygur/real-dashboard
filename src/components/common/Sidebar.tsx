import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Dashboard</h2>

      <nav>
        <ul className={styles.list}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/rooms"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Rooms
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
