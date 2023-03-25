import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth({ session }) {
  return session.connected ? <Outlet /> : <Navigate to="/login" />;
}
