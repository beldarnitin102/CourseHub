import { useEffect, useState } from "react";
import AdminLayout from "../../components/dashboard/AdminLayout";
import { getAllUsers } from "../../services/operations/adminAPI";
import { useSelector } from "react-redux";

export default function Users() {
  const { token } = useSelector((state) => state.auth);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await getAllUsers(token);

      if (response?.success) {
        setUsers(response.data);
      }
    }

    fetchUsers();
  }, []);

  return (
    <AdminLayout>
      <h1 className="mb-8 text-4xl font-bold">
        Users
      </h1>

      <div className="overflow-hidden rounded-2xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Name
              </th>

              <th>Email</th>

              <th>Role</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user._id}
                className="border-t"
              >

                <td className="p-4">
                  {user.firstName} {user.lastName}
                </td>

                <td>{user.email}</td>

                <td>{user.accountType}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
}