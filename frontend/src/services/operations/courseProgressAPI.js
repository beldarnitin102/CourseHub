import { apiConnector } from "../apiconnector";
import { courseProgressEndpoints } from "../endpoints";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL + "/progress";

export const markLectureComplete = async (
  courseId,
  lectureId,
  token
) => {
  try {
    const response = await apiConnector(
      "POST",
      `${BASE_URL}/mark-complete`,
      {
        courseId,
        lectureId,
      },
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

export const getCourseProgress = async (
  courseId,
  token
) => {
  try {
    const response = await apiConnector(
      "GET",
      `${BASE_URL}/${courseId}`,
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

export const updateLastViewedLecture = async (
  courseId,
  lectureId,
  token
) => {
  try {
    const response = await apiConnector(
      "POST",
      `${BASE_URL}/last-viewed`,
      {
        courseId,
        lectureId,
      },
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

export async function saveNotes(
  lectureId,
  notes,
  token
) {
  try {
    const response = await apiConnector(
      "POST",
      courseProgressEndpoints.SAVE_NOTES_API,
      {
        lectureId,
        notes,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}