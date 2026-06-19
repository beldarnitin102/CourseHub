import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function InstructorRoute({
  children,
}) {
  const { user } = useSelector(
    (state) => state.profile
  );

  if (
    user?.accountType !== "Instructor"
  ) {
    return <Navigate to="/" />;
  }

  return children;
}