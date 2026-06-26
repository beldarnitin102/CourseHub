import { apiConnector } from "../apiconnector";

const BASE_URL =
"http://localhost:3000/api/v1/ai";

export const generateCourse =
async (data, token) => {


try {

  const response =
    await apiConnector(
      "POST",
      `${BASE_URL}/generate-course`,
      data,
      {
        Authorization:
          `Bearer ${token}`,
      }
    );

  return response.data;

} catch (error) {
  console.log(error);
}


};
