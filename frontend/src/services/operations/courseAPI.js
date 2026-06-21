import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import axios from "axios"; 

const BASE_URL = "http://localhost:3000/api/v1";

// ================= CREATE COURSE =================

export const createCourse = async (
  formData,
  token
) => {
  const toastId = toast.loading(
    "Creating Course..."
  );

  try {
    const response = await apiConnector(
      "POST",
      `${BASE_URL}/course/createCourse`,
      formData,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(
        response.data.message
      );
    }

    toast.success(
      "Course Created Successfully"
    );

    return response.data;
  } catch (error) {
    console.log(error);

    toast.error(
      error?.response?.data?.message ||
        "Failed To Create Course"
    );

    return null;
  } finally {
    toast.dismiss(toastId);
  }
};

// ================= CREATE SECTION =================

export const createSection = async (
  data,
  token
) => {
  const toastId = toast.loading(
    "Creating Section..."
  );

  try {
    const response = await apiConnector(
      "POST",
      `${BASE_URL}/course/addSection`,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(
        response.data.message
      );
    }

    toast.success("Section Added");

    return response.data;
  } catch (error) {
    console.log(error);

    toast.error(
      error?.response?.data?.message ||
        "Failed To Add Section"
    );

    return null;
  } finally {
    toast.dismiss(toastId);
  }
};

// ================= CREATE SUBSECTION =================

export const createSubSection =
  async (data, token) => {
    const toastId = toast.loading(
      "Adding Lecture..."
    );

    try {
      const response =
        await apiConnector(
          "POST",
          `${BASE_URL}/course/createSubSection`,
          data,
          {
            Authorization: `Bearer ${token}`,
          }
        );

      if (!response.data.success) {
        throw new Error(
          response.data.message
        );
      }

      toast.success("Lecture Added");

      return response.data;
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||
          "Failed To Add Lecture"
      );

      return null;
    } finally {
      toast.dismiss(toastId);
    }
  };

// ================= COURSE DETAILS =================

export const getCourseDetails =
  async (courseId) => {
    try {
      const response =
        await apiConnector(
          "POST",
          `${BASE_URL}/course/getCourseDetails`,
          {
            courseId,
          }
        );

      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

// ================= ALL COURSES =================

export const getAllCourses =
  async () => {
    try {
      const response =
        await apiConnector(
          "GET",
          `${BASE_URL}/course/getAllCourses`
        );

      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  export const getInstructorCourses = async (token) => {
  try {
    // Making the GET request and passing the token in the Authorization header
    const response = await axios.get(`${BASE_URL}/getInstructorCourses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Your component reads 'result.data', so we return the response directly
    // (Axios puts the server response body inside a 'data' property)
    return response; 

  } catch (error) {
    console.error("GET_INSTRUCTOR_COURSES_API ERROR...", error);
    // Return an empty object or null so 'result?.data' doesn't crash the app on failure
    return null; 
  }
};

export const getInstructorDashboard =
  async (token) => {
    try {
      const response =
        await apiConnector(
          "GET",
          `${BASE_URL}/course/instructorDashboard`,
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );

      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };