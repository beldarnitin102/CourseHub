import { apiConnector } from "../apiconnector";
import { adminEndpoints } from "../endpoints";

const {
  DASHBOARD,
  USERS,
  COURSES,
} = adminEndpoints;

export const getDashboardStats = async (token) => {
  try {
    const response = await apiConnector(
      "GET",
      DASHBOARD,
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

export const getAllUsers = async (token) => {
  try {
    const response = await apiConnector(
      "GET",
      USERS,
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

export const getAllCourses = async (token) => {
  try {
    const response = await apiConnector(
      "GET",
      COURSES,
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

export const getInstructorDetails = async (id, token) => {
  try {
    const response = await apiConnector(
      "GET",
      adminEndpoints.INSTRUCTOR_DETAILS(id),
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

export const getStudentDetails = async (
  id,
  token
) => {
  try {
    const response = await apiConnector(
      "GET",
      adminEndpoints.STUDENT_DETAILS(id),
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return response.data;
  } catch (err) {
    console.log(err);
  }
};