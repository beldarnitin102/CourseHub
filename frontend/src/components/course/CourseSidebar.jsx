export default function CourseSidebar({
  thumbnail,
  price,
}) {
  return (
    <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-lg">

      <img
        src={thumbnail}
        alt="course"
        className="h-56 w-full rounded-2xl object-cover"
      />

      <h2 className="mt-6 text-4xl font-bold text-[#2563EB]">
        ₹{price}
      </h2>

      <button className="mt-5 w-full rounded-xl bg-[#2563EB] py-4 font-semibold text-white transition hover:scale-[1.02]">
        Enroll Now
      </button>

      <button className="mt-3 w-full rounded-xl border border-gray-300 py-4 font-semibold">
        Add To Cart
      </button>

      <div className="mt-6 space-y-3 text-sm text-gray-600">

        <p>✓ Lifetime Access</p>

        <p>✓ Certificate of Completion</p>

        <p>✓ Mobile & Desktop Access</p>

        <p>✓ Full Source Code</p>

      </div>

    </div>
  );
}