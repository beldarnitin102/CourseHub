import { apiConnector } from "../apiconnector";

const BASE_URL =
  "http://localhost:3000/api/v1/profile";

export const getEnrolledCourses = async (
  token
) => {
  try {
    const response = await apiConnector(
      "GET",
      `${BASE_URL}/getEnrolledCourses`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};