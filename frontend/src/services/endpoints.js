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

export const paymentEndpoints = {
  CAPTURE_PAYMENT: `${BASE_URL}/payment/capturePayment`,
  VERIFY_PAYMENT: `${BASE_URL}/payment/verifySignature`,
};

export const courseProgressEndpoints = {
  MARK_COMPLETE: `${BASE_URL}/courseProgress/mark-complete`,
  GET_PROGRESS: `${BASE_URL}/courseProgress`,
  UPDATE_LAST_VIEWED: `${BASE_URL}/courseProgress/update-last-viewed`,
};

export const lectureNoteEndpoints = {
  SAVE_NOTE: `${BASE_URL}/lecture/save-note`,
  GET_NOTE: `${BASE_URL}/lecture/get-note`,
};

export const profileEndpoints = {
  GET_USER_DETAILS: `${BASE_URL}/profile/getUserDetails`,
  GET_ENROLLED_COURSES: `${BASE_URL}/profile/getEnrolledCourses`,
};

export const adminEndpoints = {
  DASHBOARD: `${BASE_URL}/admin/dashboard`,
  USERS: `${BASE_URL}/admin/users`,
  COURSES: `${BASE_URL}/admin/courses`,
  CATEGORIES: `${BASE_URL}/admin/categories`,

  INSTRUCTOR_DETAILS: (id) => `${BASE_URL}/admin/instructor/${id}`,
  STUDENT_DETAILS: (id) => `${BASE_URL}/admin/student/${id}`,

   COURSE_DETAILS: (id) =>
    `${BASE_URL}/admin/course/${id}`,
};

export const adminCategoryEndpoints = {
  CREATE_CATEGORY: `${BASE_URL}/admin/create-category`,

  UPDATE_CATEGORY: `${BASE_URL}/admin/update-category`,

  DELETE_CATEGORY: `${BASE_URL}/admin/delete-category`,
};

export const mentorEndpoints = {
  ASK_MENTOR: `${BASE_URL}/mentor/ask`,
};

export const studyPlannerEndpoints = {
  GENERATE: `${BASE_URL}/course/generateStudyPlanner`,
};

export const projectEndpoints = {
  GENERATE: `${BASE_URL}/course/generate`,
};

export const interviewEndpoints = {

  START: `${BASE_URL}/course/generate-interview`,

  ANSWER: `${BASE_URL}/course/generate-interview`,

};

// Example check for your endpoints.js file:
export const recommendationEndpoints = {
  GENERATE: `${BASE_URL}/course/recommendations`, // ya jo bhi apka backend route hai
};
