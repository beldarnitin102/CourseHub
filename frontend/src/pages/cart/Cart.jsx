import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../dashboard/DashboardLayout";

import {
  setCart,
  setTotalItems,
} from "../../redux/slices/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();

  const { cart } = useSelector(
    (state) => state.cart
  );

  const removeFromCart = (courseId) => {
    const updatedCart = cart.filter(
      (item) => item._id !== courseId
    );

    dispatch(setCart(updatedCart));

    dispatch(
      setTotalItems(updatedCart.length)
    );

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price,
    0
  );

  const handleCheckout = () => {
    alert(
      "Next Step: Razorpay Checkout"
    );
  };

  return (
    <DashboardLayout>
      <div className="p-10">
        <h1 className="mb-8 text-4xl font-bold">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div>No Courses In Cart</div>
        ) : (
          <div className="space-y-6">
            {cart.map((course) => (
              <div
                key={course._id}
                className="flex items-center justify-between rounded-xl border p-5"
              >
                <div className="flex gap-5">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="h-28 w-44 rounded-lg object-cover"
                  />

                  <div>
                    <h2 className="text-xl font-bold">
                      {course.courseName}
                    </h2>

                    <p className="text-blue-600">
                      ₹{course.price}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    removeFromCart(course._id)
                  }
                  className="rounded bg-red-500 px-4 py-2 text-white"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="rounded-xl bg-gray-100 p-5">
              <h2 className="text-2xl font-bold">
                Total: ₹{totalPrice}
              </h2>

              <button
                onClick={handleCheckout}
                className="mt-4 rounded-xl bg-blue-600 px-8 py-3 text-white"
              >
                Buy Now
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}