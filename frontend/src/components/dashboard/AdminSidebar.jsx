import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import  {logout}  from "../../services/operations/profileAPI";

export default function AdminSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-72 flex-col bg-white shadow-lg">

      <div className="border-b p-6">
        <h1 className="text-3xl font-bold">
          Admin Panel
        </h1>
      </div>

      <nav className="flex flex-1 flex-col p-4">

        <NavLink
          to="/dashboard/admin"
          className="rounded-lg p-4 hover:bg-blue-100"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/admin/users"
          className="rounded-lg p-4 hover:bg-blue-100"
        >
          Users
        </NavLink>

        <NavLink
          to="/dashboard/admin/courses"
          className="rounded-lg p-4 hover:bg-blue-100"
        >
          Courses
        </NavLink>

        <NavLink
          to="/dashboard/admin/categories"
          className="rounded-lg p-4 hover:bg-blue-100"
        >
          Categories
        </NavLink>

        <NavLink
          to="/dashboard/admin/analytics"
          className="rounded-lg p-4 hover:bg-blue-100"
        >
          Analytics
        </NavLink>

      </nav>

      <div className="border-t p-4">
        <button
          onClick={() => logout(dispatch, navigate)}
          className="w-full rounded-xl bg-red-500 py-3 font-semibold text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>

    </div>
  );
}