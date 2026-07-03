import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { recommendationEndpoints } from "../endpoints"; // 👈 Make sure apke endpoints file me ye registered ho

// Update the parameters to take an object destructured, or single object payload
export const getRecommendations = async (data, token) => {
  const toastId = toast.loading("Generating Recommendations...");

  try {
    const response = await apiConnector(
      "POST",
      recommendationEndpoints.GENERATE,
      // Pass the complete data object containing courseId, completedSections, and progress
      data, 
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Recommendations Generated");
    return response.data;

  } catch (error) {
    console.log(error);
    toast.error(
      error?.response?.data?.message ||
      "Unable to Generate Recommendations"
    );
    return null;
  } finally {
    toast.dismiss(toastId);
  }
};
