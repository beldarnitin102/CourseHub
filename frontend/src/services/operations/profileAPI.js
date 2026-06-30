import { apiConnector } from "../apiconnector";
import {profileEndpoints} from "../endpoints"
import { toast } from "react-hot-toast";

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

export const logout = (dispatch, navigate) => {
  try {
    // 1. Clear local storage data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // 2. Reset Redux states (Uncomment and update paths if you use slices)
    // dispatch(setToken(null));
    // dispatch(setUser(null));

    // 3. Show success confirmation message
    toast.success("Logged out successfully");

    // 4. Redirect user back to the login page
    navigate("/login");
  } catch (error) {
    console.error("Logout Error:", error);
    toast.error("Something went wrong during logout");
  }
};

