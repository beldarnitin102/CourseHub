import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { projectEndpoints } from "../endpoints";

export const generateProjects = async (
  courseId,
  token
) => {

  const toastId = toast.loading("Generating Projects...");

  try {

    const response = await apiConnector(
      "POST",
      projectEndpoints.GENERATE,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Projects Generated");

    console.log("Projects Generated:", response.data);
    console.log(response)

    return response.data;

  } catch (error) {

    console.log(error);

    toast.error(
      error?.response?.data?.message ||
      "Unable to Generate Projects"
    );

    return null;

  } finally {

    toast.dismiss(toastId);

  }

};