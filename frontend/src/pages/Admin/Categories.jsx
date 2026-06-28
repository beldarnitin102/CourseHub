import { useEffect, useState } from "react";
import AdminLayout from "../../components/dashboard/AdminLayout";
import { getCategories } from "../../services/operations/courseAPI";

export default function Categories() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {

    async function fetchCategories() {

      const response = await getCategories();

      if (response?.success) {
        setCategories(response.data);
      }

    }

    fetchCategories();

  }, []);

  return (

    <AdminLayout>

      <h1 className="mb-8 text-4xl font-bold">
        Categories
      </h1>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

        {categories.map((category) => (

          <div
            key={category._id}
            className="rounded-2xl bg-white p-6 shadow"
          >

            <h2 className="text-2xl font-bold">
              {category.name}
            </h2>

            <p className="mt-3 text-gray-500">
              {category.description}
            </p>

          </div>

        ))}

      </div>

    </AdminLayout>

  );
}