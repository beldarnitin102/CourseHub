import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import AdminLayout from "../../components/dashboard/AdminLayout";
import CategoryModal from "./CategoryModal";

import { getCategories } from "../../services/operations/courseAPI";

import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/operations/adminCategoryAPI";

export default function Categories() {
  const { token } = useSelector((state) => state.auth);

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState(null);

  async function fetchCategories() {
    setLoading(true);

    const response = await getCategories();

    if (response?.success) {
      setCategories(response.data);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      `${category.name} ${category.description}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [categories, search]);

  async function handleSubmit(data) {
    let response;

    if (data.categoryId) {
      response = await updateCategory(data, token);
    } else {
      response = await createCategory(data, token);
    }

    if (response?.success) {
      toast.success(response.message);

      setIsOpen(false);

      setSelectedCategory(null);

      fetchCategories();
    }
  }

  async function handleDelete(categoryId) {
    const confirmDelete = window.confirm(
      "Delete this category?"
    );

    if (!confirmDelete) return;

    const response = await deleteCategory(
      categoryId,
      token
    );

    if (response?.success) {
      toast.success(response.message);

      fetchCategories();
    }
  }

  return (
    <AdminLayout>
      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Categories
          </h1>

          <p className="mt-2 text-gray-500">
            Manage all learning categories
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedCategory(null);
            setIsOpen(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          <Plus size={20} />

          Add Category
        </button>
      </div>

      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-gray-500">
            Total Categories
          </p>

          <h2 className="mt-2 text-4xl font-bold text-blue-600">
            {categories.length}
          </h2>
        </div>

        <div className="relative w-full lg:w-96">
          <Search
            size={20}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border py-4 pl-12 pr-4 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-xl">
          Loading...
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCategories.map((category) => (
            <div
              key={category._id}
              className="rounded-3xl bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {category.name}
                  </h2>

                  <p className="mt-4 text-gray-500">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t pt-5">
                <p className="text-sm text-gray-400">
                  Created
                </p>

                <p className="mt-1 font-semibold">
                  {category.createdAt
                    ? new Date(
                        category.createdAt
                      ).toLocaleDateString(
                        "en-IN"
                      )
                    : "-"}
                </p>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsOpen(true);
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-yellow-500 py-3 font-semibold text-white hover:bg-yellow-600"
                >
                  <Pencil size={18} />

                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(category._id)
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700"
                >
                  <Trash2 size={18} />

                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <CategoryModal
        isOpen={isOpen}
        category={selectedCategory}
        onClose={() => {
          setIsOpen(false);
          setSelectedCategory(null);
        }}
        onSubmit={handleSubmit}
      />
    </AdminLayout>
  );
}