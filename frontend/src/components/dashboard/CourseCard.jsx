export default function CourseCard({
  title,
  instructor,
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-md">
      <h3 className="text-xl font-bold">
        {title}
      </h3>

      <p className="mt-2 text-gray-500">
        {instructor}
      </p>
    </div>
  );
}