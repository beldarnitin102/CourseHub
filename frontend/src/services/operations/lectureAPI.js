import { apiConnector } from "../apiconnector";
import { lectureNoteEndpoints } from "../endpoints";

const {
  SAVE_NOTE,
  GET_NOTE,
} = lectureNoteEndpoints;

export const saveLectureNote = async (
  data,
  token
) => {
  try {
    const response = await apiConnector(
      "POST",
      SAVE_NOTE,
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
      `${GET_NOTE}/${courseId}/${lectureId}`,
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