import { apiConnector } from "../apiconnector";

const BASE_URL =
  "http://localhost:3000/api/v1/lecture";

export const saveLectureNote = async (
  data,
  token
) => {
  try {
    const response = await apiConnector(
      "POST",
      `${BASE_URL}/save-note`,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getLectureNote = async (
  courseId,
  lectureId,
  token
) => {
  try {
    const response = await apiConnector(
      "GET",
      `${BASE_URL}/get-note/${courseId}/${lectureId}`,
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