import { useEffect, useState } from "react";

export default function CategoryModal({
  isOpen,
  onClose,
  onSubmit,
  category,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [category]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      categoryId: category?._id,
      name,
      description,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl">

        <h2 className="mb-6 text-3xl font-bold">

          {category ? "Edit Category" : "Create Category"}

        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="mb-2 block font-semibold">
              Category Name
            </label>

            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border p-4 outline-none focus:border-blue-500"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              Description
            </label>

            <textarea
              rows={5}
              value={description}
              required
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full rounded-xl border p-4 outline-none focus:border-blue-500"
            />

          </div>

          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-6 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              {category ? "Save Changes" : "Create"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}