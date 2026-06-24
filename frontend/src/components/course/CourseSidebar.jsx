import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // Optimized imports
import { setCart, setTotalItems } from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";
import { capturePayment } from "../../services/operations/courseAPI";

export default function CourseSidebar({ thumbnail, price, course }) {
  // 1. Move all hooks to the top level
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const isLoggedIn = !!token;
const handleBuyNow = async () => {
  if (!isLoggedIn) {
    navigate("/login");
    return;
  }

  const response =
    await capturePayment(
      course._id,
      token
    );

  console.log(response);

  if (!response?.success) {
    toast.error("Payment Failed");
    return;
  }

  const options = {
    key:
      import.meta.env.VITE_RAZORPAY_KEY,

    amount: response.amount,

    currency: response.currency,

    order_id: response.orderId,

    name: "CourseHub",

    description:
      response.courseName,

    image:
      response.thumbnail,
  };

  const paymentObject =
    new window.Razorpay(options);

  paymentObject.open();
};

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // Check if course is already in cart using its _id
    const alreadyAdded = cart.find((item) => item._id === course._id);

    if (alreadyAdded) {
      toast.error("Course already in cart");

      return;
    }

    // Build the updated cart array securely
    const updatedCart = [...cart, course];

    dispatch(setCart(updatedCart));
    dispatch(setTotalItems(updatedCart.length));

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Optional: Redirect to cart after successful add
    navigate("/cart");
  };

  // REMOVED: The loose navigate("/cart") that was crashing your render phase.

  return (
    <div className="sticky top-24 overflow-hidden rounded-3xl bg-white shadow-xl">
      {/* Thumbnail */}
      <img src={thumbnail} alt="course" className="h-56 w-full object-cover" />

      <div className="p-6">
        {/* Price */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-4xl font-bold text-[#2563EB]">₹{price}</h2>
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
            If you're not satisfied, get a full refund within 30 days.
          </p>
        </div>
      </div>
    </div>
  );
}
