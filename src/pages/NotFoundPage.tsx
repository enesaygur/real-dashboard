import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <h1>404</h1>
      <p>The page are looking for does not exist</p>
      <Link to="/">Go to Dashboard</Link>
    </div>
  );
}

export default NotFoundPage;
