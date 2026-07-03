import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";

import { studyPlannerEndpoints } from "../endpoints";

// ==============================
// Generate Study Planner
// ==============================

export const generateStudyPlanner = async (courseId, token) => {
  const toastId = toast.loading("Generating Study Planner...");

  try {
    const response = await apiConnector(
  "POST",
  studyPlannerEndpoints.GENERATE,
  { courseId },
  {
    Authorization: `Bearer ${token}`,
  }
);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Study Planner Generated");

    return response.data;
  } catch (error) {
    console.log(error);

    toast.error(
      error?.response?.data?.message ||
      "Failed to Generate Study Planner"
    );

    return null;
  } finally {
    toast.dismiss(toastId);
  }
};