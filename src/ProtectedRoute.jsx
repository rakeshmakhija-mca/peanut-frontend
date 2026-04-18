import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const isAuth = localStorage.getItem("isAdmin");

    return isAuth ? <Outlet /> : <Navigate to="/admin/login" replace />;
}