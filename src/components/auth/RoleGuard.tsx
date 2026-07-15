import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";

interface RoleGuardProps {
  allowedRoles: ("Admin" | "User")[];
}
function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthoried" replace />;
  }

  return <Outlet />;
}

export default RoleGuard;
