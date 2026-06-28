import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminRoute({
  children,
}) {
  const { user } = useSelector(
    (state) => state.profile
  );

  if (user?.accountType !== "Admin") {
    return <Navigate to="/" />;
  }

  return children;
}