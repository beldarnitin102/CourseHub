export default function AdminStatCard({
  title,
  value,
  color,
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">

      <h3 className="text-gray-500">
        {title}
      </h3>

      <p
        className={`mt-3 text-5xl font-bold ${color}`}
      >
        {value}
      </p>

    </div>
  );
}