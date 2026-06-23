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

  name: "CourseHub",

  description: order.courseName,

  image: order.thumbnail,

  order_id: order.orderId,

  prefill: {
    name:
      `${user.firstName} ${user.lastName}`,

    email: user.email,
  },

  handler: async function (response) {
    try {
      const verifyResponse =
        await apiConnector(
          "POST",
          VERIFY_PAYMENT,
          {
            razorpay_order_id:
              response.razorpay_order_id,

            razorpay_payment_id:
              response.razorpay_payment_id,

            razorpay_signature:
              response.razorpay_signature,

            courseId,
          },
          {
            Authorization:
              `Bearer ${token}`,
          }
        );

      if (verifyResponse.data.success) {
        toast.success(
          "Course Purchased Successfully"
        );
      }
    } catch (error) {
      toast.error(
        "Payment Verification Failed"
      );
    }
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
