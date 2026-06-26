import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside>
      <h2>Dashboard</h2>

      <nav>
        <ul>
          <li>
            <NavLink to="/">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/users">Users</NavLink>
          </li>
          <li>
            <NavLink to="/settings">Settings</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
