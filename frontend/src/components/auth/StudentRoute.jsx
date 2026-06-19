import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function StudentRoute({
  children,
}) {
  const { user } = useSelector(
    (state) => state.profile
  );

  if (
    user?.accountType !== "Student"
  ) {
    return <Navigate to="/" />;
  }

  return children;
}