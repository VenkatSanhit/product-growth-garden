import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

/** Free access gate: must have completed sign-up or sign-in on this device. */
export function RequireAuth() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
  }

  return <Outlet />;
}
