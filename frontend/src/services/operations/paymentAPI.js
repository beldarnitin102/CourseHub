import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { paymentEndpoints } from "../endpoints";

const {
CAPTURE_PAYMENT,
VERIFY_PAYMENT,
} = paymentEndpoints;

export const buyCourse = async (
token,
courseId,
user
) => {
try {
const response = await apiConnector(
"POST",
CAPTURE_PAYMENT,
{ courseId },
{
Authorization: `Bearer ${token}`,
}
);


if (!response.data.success) {
  throw new Error(response.data.message);
}

const order = response.data;

const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY,

  amount: order.amount,
  currency: order.currency,
  order_id: order.orderId,

  name: "CourseHub",
  description: order.courseName,

  prefill: {
    name: `${user?.firstName || ""} ${user?.lastName || ""}`,
    email: user?.email || "",
  },

  theme: {
    color: "#2563EB",
  },
};

const paymentObject =
  new window.Razorpay(options);

paymentObject.open();


} catch (error) {
console.log(error);


toast.error(
  error?.response?.data?.message ||
  "Payment Failed"
);


}
};
