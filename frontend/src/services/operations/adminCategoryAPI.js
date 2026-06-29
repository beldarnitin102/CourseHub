import { apiConnector } from "../apiconnector";
import { adminCategoryEndpoints } from "../endpoints";

const {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} = adminCategoryEndpoints;

export const createCategory = async (data, token) => {
  try {
    const response = await apiConnector(
      "POST",
      CREATE_CATEGORY,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateCategory = async (data, token) => {
  try {
    const response = await apiConnector(
      "PUT",
      UPDATE_CATEGORY,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteCategory = async (
  categoryId,
  token
) => {
  try {

    const response = await apiConnector(
      "DELETE",
      DELETE_CATEGORY,
      null,
      {
        Authorization: `Bearer ${token}`,
      },
      {
        categoryId,
      }
    );

    return response.data;

  } catch (err) {
    console.log(err);
  }
};