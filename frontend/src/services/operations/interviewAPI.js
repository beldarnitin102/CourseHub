import toast from "react-hot-toast";

import { apiConnector } from "../apiconnector";

import { interviewEndpoints } from "../endpoints";

export const startInterview = async (
  courseId,
  token
) => {

  const toastId = toast.loading("Preparing Interview...");

  try {

    const response = await apiConnector(
      "POST",
      interviewEndpoints.START,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Interview Started");

    console.log("Interview Response:", response.data);
    console.log("responce :", response);

    return response.data;

  } catch (error) {

    console.log(error);

    toast.error(
      error?.response?.data?.message ||
      "Unable to Start Interview"
    );

    return null;

  } finally {

    toast.dismiss(toastId);

  }

};

export const submitInterviewAnswer = async (
  question,
  answer,
  courseId,
  token
) => {

  const toastId = toast.loading("Checking Answer...");

  try {

    const response = await apiConnector(
      "POST",
      interviewEndpoints.ANSWER,
      {
        question,
        answer,
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Answer Evaluated");

    return response.data;

  } catch (error) {

    console.log(error);

    toast.error(
      error?.response?.data?.message ||
      "Evaluation Failed"
    );

    return null;

  } finally {

    toast.dismiss(toastId);

  }

};