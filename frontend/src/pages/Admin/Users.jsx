import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/dashboard/AdminLayout";
import { getAllUsers } from "../../services/operations/adminAPI";
import Loader from "../../components/Loader";

export default function Users() {
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("Student");

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);

    const response = await getAllUsers(token);

    if (response?.success) {
      setUsers(response.data);
    }

    setLoading(false);
  }

  const studentCount = users.filter((u) => u.accountType === "Student").length;

  const instructorCount = users.filter(
    (u) => u.accountType === "Instructor",
  ).length;

  const adminCount = users.filter((u) => u.accountType === "Admin").length;

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const roleMatch = user.accountType === activeTab;

      const searchMatch = `${user.firstName} ${user.lastName} ${user.email}`
        .toLowerCase()
        .includes(search.toLowerCase());

      return roleMatch && searchMatch;
    });
  }, [users, activeTab, search]);

  return (
    <AdminLayout>
      {/* Header */}

      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">User Management</h1>

          <p className="mt-2 text-gray-500">
            Manage every user registered on your platform.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-5 py-3 outline-none transition focus:border-blue-500 lg:w-96"
        />
      </div>

      {/* Tabs */}

      <div className="mb-8 flex gap-4 flex-wrap">
        <button
          onClick={() => setActiveTab("Student")}
          className={`rounded-xl px-6 py-3 font-semibold transition ${
            activeTab === "Student"
              ? "bg-blue-600 text-white"
              : "bg-white shadow"
          }`}
        >
          Students ({studentCount})
        </button>

        <button
          onClick={() => setActiveTab("Instructor")}
          className={`rounded-xl px-6 py-3 font-semibold transition ${
            activeTab === "Instructor"
              ? "bg-green-600 text-white"
              : "bg-white shadow"
          }`}
        >
          Instructors ({instructorCount})
        </button>

        <button
          onClick={() => setActiveTab("Admin")}
          className={`rounded-xl px-6 py-3 font-semibold transition ${
            activeTab === "Admin"
              ? "bg-purple-600 text-white"
              : "bg-white shadow"
          }`}
        >
          Admins ({adminCount})
        </button>
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-5 text-left">User</th>

                <th className="px-6 py-5 text-left">Email</th>

                <th className="px-6 py-5 text-left">Joined</th>

                <th className="px-6 py-5 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="p-12 text-center text-lg">
                    <Loader />
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-12 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b transition hover:bg-blue-50"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            user.image ||
                            `https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName}`
                          }
                          alt=""
                          className="h-14 w-14 rounded-full object-cover"
                        />

                        <div>
                          <h2 className="font-semibold text-slate-800">
                            {user.firstName} {user.lastName}
                          </h2>

                          <p className="text-sm text-gray-500">
                            {user.accountType}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">{user.email}</td>

                    <td className="px-6 py-5">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "-"}
                    </td>

                    <td className="px-6 py-5 text-center">
                      {user.accountType === "Instructor" ? (
                        <button
                          onClick={() =>
                            navigate(`/dashboard/admin/instructor/${user._id}`)
                          }
                          className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
                        >
                          View Analytics
                        </button>
                      ) : user.accountType === "Student" ? (
                        <button
                          onClick={() =>
                            navigate(`/dashboard/admin/student/${user._id}`)
                          }
                          className="rounded-lg bg-green-600 px-5 py-2 text-white transition hover:bg-green-700"
                        >
                          View Profile
                        </button>
                      ) : (
                        <button className="rounded-lg bg-purple-600 px-5 py-2 text-white">
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
