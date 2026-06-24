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

  handler: async function (response) {
    console.log("PAYMENT SUCCESS");

     console.log("RAZORPAY RESPONSE", response);
    await verifyPayment(
      response,
      courseId,
      token
    );
    console.log("VERIFY RESPONSE", verifyResponse);
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

export const verifyPayment = async (
  paymentData,
  courseId,
  token
) => {
  try {
    console.log("verifyPayment called");

    const response = await apiConnector(
      "POST",
      VERIFY_PAYMENT,
      {
        razorpay_order_id:
          paymentData.razorpay_order_id,

        razorpay_payment_id:
          paymentData.razorpay_payment_id,

        razorpay_signature:
          paymentData.razorpay_signature,

        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
