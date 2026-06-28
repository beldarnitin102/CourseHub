import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="w-72 bg-white shadow-lg">

      <div className="border-b p-6">

        <h1 className="text-3xl font-bold">
          Admin Panel
        </h1>

      </div>

      <nav className="flex flex-col p-4">

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
    </div>
  );
}