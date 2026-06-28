import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/dashboard/AdminLayout";
import { getAllUsers } from "../../services/operations/adminAPI";

export default function Users() {
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [activeTab, setActiveTab] = useState("Student");

  useEffect(() => {
    async function fetchUsers() {
      const response = await getAllUsers(token);

      if (response?.success) {
        setUsers(response.data);
      }
    }

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => user.accountType === activeTab);
  }, [users, activeTab]);

  return (
    <AdminLayout>
      <h1 className="mb-8 text-4xl font-bold">User Management</h1>

      {/* Tabs */}

      <div className="mb-8 flex gap-5">
        {["Student", "Instructor", "Admin"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-xl px-6 py-3 font-semibold transition ${
              activeTab === tab ? "bg-blue-600 text-white" : "bg-white shadow"
            }`}
          >
            {tab}s
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-5 text-left">User</th>

              <th>Email</th>

              <th>Joined</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="flex items-center gap-4 p-5">
                  <img
                    src={user.image}
                    alt=""
                    className="h-12 w-12 rounded-full"
                  />

                  <div>
                    <h2 className="font-semibold">
                      {user.firstName} {user.lastName}
                    </h2>

                    <p className="text-sm text-gray-500">{user.accountType}</p>
                  </div>
                </td>

                <td>{user.email}</td>

                <td>
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-IN")
                    : "-"}
                </td>

                <td>
                  {user.accountType === "Instructor" ? (
                    <button
                      onClick={() =>
                        navigate(`/dashboard/admin/instructor/${user._id}`)
                      }
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                    >
                      View Analytics
                    </button>
                  ) : user.accountType === "Student" ? (
                    <button
                      onClick={() =>
                        navigate(`/dashboard/admin/student/${user._id}`)
                      }
                      className="rounded-lg bg-green-600 px-4 py-2 text-white"
                    >
                      View Profile
                    </button>
                  ) : (
                    <button className="rounded-lg bg-gray-300 px-4 py-2">
                      View
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
