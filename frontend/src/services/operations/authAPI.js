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