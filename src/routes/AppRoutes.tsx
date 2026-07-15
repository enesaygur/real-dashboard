import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import UsersPage from "../pages/UsersPage/UsersPage";
import SettingsPage from "../pages/SettingsPage";
import ProfilePage from "../pages/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import RoomsPage from "../pages/RoomsPage/RoomsPage";
import ReservationsPage from "../pages/ReservationsPage/ReservationsPage";
import RoleGuard from "../components/auth/RoleGuard";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route element={<RoleGuard allowedRoles={["Admin", "User"]} />}>
              <Route index element={<DashboardPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            <Route element={<RoleGuard allowedRoles={["Admin"]} />}>
              <Route path="rooms" element={<RoomsPage />} />
              <Route path="reservations" element={<ReservationsPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
