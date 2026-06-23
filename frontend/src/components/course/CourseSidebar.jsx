import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CourseSidebar({
  thumbnail,
  price,
}) {

  const { token } = useSelector(
  (state) => state.auth
);

  const navigate = useNavigate();

  // Later replace with Redux/Auth
  const isLoggedIn = !!token;

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    navigate("/checkout");
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    console.log("Added To Cart");
  };

  return (
    <div className="sticky top-24 overflow-hidden rounded-3xl bg-white shadow-xl">

      {/* Thumbnail */}
      <img
        src={thumbnail}
        alt="course"
        className="h-56 w-full object-cover"
      />

      <div className="p-6">

        {/* Price */}
        <div className="mb-4 flex items-center justify-between">

          <h2 className="text-4xl font-bold text-[#2563EB]">
            ₹{price}
          </h2>

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            20% OFF
          </span>

        </div>

        {/* Buy Button */}
        <button
          onClick={handleBuyNow}
          className="w-full rounded-xl bg-[#2563EB] py-4 font-semibold text-white transition duration-300 hover:scale-[1.02]"
        >
          Buy Now
        </button>

        {/* Cart */}
        <button
          onClick={handleAddToCart}
          className="mt-3 w-full rounded-xl border border-gray-300 py-4 font-semibold transition hover:bg-gray-50"
        >
          Add To Cart
        </button>

        {/* Secure Purchase */}
        <p className="mt-4 text-center text-sm text-gray-500">
          🔒 Secure Payment via Razorpay
        </p>

        {/* Includes */}
        <div className="mt-8">

          <h3 className="mb-4 text-lg font-bold text-[#111827]">
            This Course Includes
          </h3>

          <div className="space-y-3 text-sm text-gray-600">

            <p>🎥 40+ Hours On-Demand Video</p>

            <p>📄 Downloadable Resources</p>

            <p>💻 Full Source Code</p>

            <p>📱 Mobile & Desktop Access</p>

            <p>🏆 Certificate Of Completion</p>

            <p>♾ Lifetime Access</p>

          </div>

        </div>

        {/* Refund */}
        <div className="mt-8 rounded-2xl bg-[#F3F4F6] p-4">

          <h4 className="font-semibold text-[#111827]">
            30-Day Money Back Guarantee
          </h4>

          <p className="mt-2 text-sm text-gray-600">
            If you're not satisfied, get a full refund
            within 30 days.
          </p>

        </div>

      </div>

    </div>
  );
}