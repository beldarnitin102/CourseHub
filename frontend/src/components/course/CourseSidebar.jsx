import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCart, setTotalItems } from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";
import { buyCourse } from "../../services/operations/paymentAPI";

export default function CourseSidebar({ thumbnail, price, course }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const { user } = useSelector((state) => state.profile);

  const { cart } = useSelector((state) => state.cart);

  const isLoggedIn = !!token;

  const handleBuyNow = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const result = await buyCourse(token, course._id, user);

    if (result?.success) {
      toast.success("Course Purchased Successfully");

      navigate("/dashboard/my-courses");
    }
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const alreadyAdded = cart.find((item) => item._id === course._id);

    if (alreadyAdded) {
      toast.error("Course already in cart");
      return;
    }

    const updatedCart = [...cart, course];

    dispatch(setCart(updatedCart));
    dispatch(setTotalItems(updatedCart.length));

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    navigate("/cart");
  };

  return (
    <div className="sticky top-24 overflow-hidden rounded-3xl bg-white shadow-xl">
      <img src={thumbnail} alt="course" className="h-56 w-full object-cover" />

      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-4xl font-bold text-[#2563EB]">₹{price}</h2>

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            20% OFF
          </span>
        </div>

        <button
          onClick={handleBuyNow}
          className="w-full rounded-xl bg-[#2563EB] py-4 font-semibold text-white"
        >
          Buy Now
        </button>

        <button
          onClick={handleAddToCart}
          className="mt-3 w-full rounded-xl border border-gray-300 py-4 font-semibold"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
