import { Link } from "react-router-dom";

function UnauthorizedPage() {
  return (
    <div>
      <h1>403</h1>
      <h2>Access Denied</h2>
      <p>You don't have permission to access this page</p>

      <Link to="/">Go to Dashboard</Link>
    </div>
  );
}

export default UnauthorizedPage;
