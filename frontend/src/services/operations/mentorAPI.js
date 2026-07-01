import toast from "react-hot-toast";

import { apiConnector } from "../apiconnector";
import { mentorEndpoints } from "../endpoints";

const {
  ASK_MENTOR,
} = mentorEndpoints;

export const askMentor = async (
  courseId,
  question,
  token
) => {

  const toastId = toast.loading("AI Mentor is thinking...");

  try {

    const response = await apiConnector(
      "POST",
      ASK_MENTOR,
      {
        courseId,
        question,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log(response.data);
    console.log(response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.data;

  } catch (err) {

    console.log(err);

    toast.error(
      err?.response?.data?.message ||
      "Failed to get AI response"
    );

    return null;

  } finally {

    toast.dismiss(toastId);

  }

};