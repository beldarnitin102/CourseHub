import { apiConnector } from "../apiconnector";
import { certificateEndpoints } from "../endpoints";
import axios from "axios";

export const getCertificate = async (courseId, token) => {
  try {
    const response = await apiConnector(
      "GET",
      `${certificateEndpoints.GET_CERTIFICATE}/${courseId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      },
    );

    return response.data;
  } catch (error) {
    // If the server explicitly sent a response (like our 404 message payload)
     if (error.response && error.response.data) {
      return error.response.data; 
    }
    console.log("Network or unexpected error:", error);
    return null;
  }
};

// Change this: export const downloadCertificate = async (courseId, token) => {
// To this:
export const downloadCertificate = async (certificateId, token) => {
  try {
    
    const response = await axios.get(
      `${certificateEndpoints.DOWNLOAD_CERTIFICATE}/${certificateId}`, // Sends certificateId now
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      },
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = "certificate.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.log("Error downloading certificate:", error);
  }
};

