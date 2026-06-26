import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../redux/slices/authSlice";
import { setUser } from "../../redux/slices/profileSlice";


export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const user = useSelector((state) => state.profile.user);

  const accountType = user?.accountType;

  const studentLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "🏠",
    },
    {
      name: "Courses",
      path: "/dashboard/courses",
      icon: "🎯",
    },
    {
      name: "My Courses",
      path: "/dashboard/my-courses",
      icon: "📚",
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: "👤",
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: "⚙️",
    },
    {
      name: "Cart",
      path: "/cart",
      icon: "🛒",
    },
  ];

  const instructorLinks = [
    {
      name: "Instructor Dashboard",
      path: "/dashboard/instructor",
      icon: "🎓",
    },
    {
      name: "Create Course",
      path: "/dashboard/create-course",
      icon: "➕",
    },
    {
      name: "Course Builder",
      path: "/dashboard/course-builder",
      icon: "🛠️",
    },
    {
      name: "My Courses",
      path: "/dashboard/instructor-courses",
      icon: "📚",
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: "👤",
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: "⚙️",
    },
    {
  name: "AI Course Generator",
  path: "/dashboard/ai-course-generator",
  icon: "⚙️",
}
  ];

  const links = accountType === "Instructor" ? instructorLinks : studentLinks;

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setUser(null));

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b bg-white px-5 lg:hidden">
        <h2 className="font-bold text-[#111827]">CourseHub</h2>

        <button onClick={() => setOpen(!open)} className="text-2xl">
          ☰
        </button>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 bg-white shadow-xl transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <div className="border-b p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB]">
              <span className="font-bold text-white">CH</span>
            </div>

            <h2 className="text-xl font-bold">CourseHub</h2>
          </div>
        </div>

        <nav className="p-4">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition
              ${
                location.pathname === link.path
                  ? "bg-[#2563EB] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>{link.icon}</span>
              {link.name}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="mt-6 w-full rounded-xl bg-red-500 px-4 py-3 font-medium text-white hover:bg-red-600"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      <div className="hidden w-72 lg:block"></div>
    </>
  );
}
