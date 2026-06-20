import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { authEndpoints } from "../endpoints";

import { setToken } from "../../redux/slices/authSlice";
import { setUser } from "../../redux/slices/profileSlice";

const {
  SEND_OTP,
  SIGNUP,
  LOGIN,
  RESET_PASSWORD_TOKEN,
  RESET_PASSWORD,
} = authEndpoints;

// SEND OTP
export const sendOTP = async (email) => {
  const toastId = toast.loading("Sending OTP...");

  try {
    const response = await apiConnector(
      "POST",
      SEND_OTP,
      { email }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("OTP Sent Successfully");
    return true;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
      "Failed To Send OTP"
    );
    return false;
  } finally {
    toast.dismiss(toastId);
  }
};

// SIGNUP
export const signup = async (
  formData,
  navigate
) => {
  const toastId = toast.loading("Creating Account...");

  try {
    const response = await apiConnector(
      "POST",
      SIGNUP,
      formData
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Signup Successful");

    navigate("/login");
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
      "Signup Failed"
    );
  } finally {
    toast.dismiss(toastId);
  }
};

// LOGIN
export const login = async (
  email,
  password,
  dispatch,
  navigate
) => {
  const toastId = toast.loading("Logging In...");

  try {
    const response = await apiConnector(
      "POST",
      LOGIN,
      {
        email,
        password,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    dispatch(
      setToken(response.data.token)
    );

    dispatch(
      setUser(response.data.user)
    );

    localStorage.setItem(
      "token",
      JSON.stringify(response.data.token)
    );

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    toast.success("Login Successful");

    navigate("/");
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
      "Login Failed"
    );
  } finally {
    toast.dismiss(toastId);
  }
};

// FORGOT PASSWORD
export const forgotPassword = async (
  email
) => {
  const toastId = toast.loading(
    "Sending Reset Link..."
  );

  try {
    const response = await apiConnector(
      "POST",
      RESET_PASSWORD_TOKEN,
      { email }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success(
      "Password Reset Email Sent"
    );
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
      "Failed To Send Reset Link"
    );
  } finally {
    toast.dismiss(toastId);
  }
};

// RESET PASSWORD
export const resetPassword = async (
  password,
  confirmPassword,
  token,
  navigate
) => {
  const toastId = toast.loading(
    "Resetting Password..."
  );

  try {
    const response = await apiConnector(
      "POST",
      RESET_PASSWORD,
      {
        password,
        confirmPassword,
        token,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success(
      "Password Reset Successful"
    );

    navigate("/login");
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
      "Password Reset Failed"
    );
  } finally {
    toast.dismiss(toastId);
  }
};