// src/auth/ProtectedRoute.tsx
import { useSession } from "./authProvider";
import { Navigate } from "react-router";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();

  if (session === null) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}
