import { apiConnector } from "../apiconnector";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL + "/ai";

export const generateCourse = async (data, token) => {
  try {
    const response = await apiConnector(
      "POST",
      `${BASE_URL}/generate-course`,
      data,
      {
        Authorization: `Bearer ${token}`,
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
