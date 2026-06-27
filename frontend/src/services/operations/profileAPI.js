import { apiConnector } from "../apiconnector";
import {profileEndpoints} from "../endpoints"

export const getUserEnrolledCourses = async (token) => {
  try {
    const response = await apiConnector(
      "GET",
      profileEndpoints.GET_ENROLLED_COURSES,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};