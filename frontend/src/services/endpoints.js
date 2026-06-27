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