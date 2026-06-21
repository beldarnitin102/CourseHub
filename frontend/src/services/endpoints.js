const BASE_URL = "http://localhost:3000/api/v1";

// AUTH ENDPOINTS

export const authEndpoints = {
  SEND_OTP: `${BASE_URL}/auth/sendOTP`,

  SIGNUP: `${BASE_URL}/auth/signup`,

  LOGIN: `${BASE_URL}/auth/login`,

  RESET_PASSWORD_TOKEN: `${BASE_URL}/auth/reset-password-token`,

  RESET_PASSWORD: `${BASE_URL}/auth/reset-password`,
};

export const courseEndpoints = {
  CREATE_COURSE: `${BASE_URL}/course/createCourse`,
  ADD_SECTION: `${BASE_URL}/course/addSection`,
  CREATE_SUBSECTION: `${BASE_URL}/course/createSubSection`,
  GET_COURSE_DETAILS: `${BASE_URL}/course/getCourseDetails`,
  GET_ALL_COURSES: `${BASE_URL}/course/getAllCourses`,
};