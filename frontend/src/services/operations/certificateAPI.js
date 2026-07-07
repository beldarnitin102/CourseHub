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
    // Catching the backend 404 payload cleanly so React can safely render <LockedCertificate />
    if (error.response && error.response.status === 404) {
      console.log("ℹ️ Certificate record does not exist yet for this course. Showing lock screen.");
      return { success: false, data: null };
    }
    
    console.log("Network or unexpected system error:", error);
    return null;
  }
};


// Change this: export const downloadCertificate = async (courseId, token) => {
// To this:
export const downloadCertificate = async (certificateId, token) => {
  try {
    // Append a unique timestamp flag parameter to completely break any old browser network cache
    const targetUrl = `${certificateEndpoints.DOWNLOAD_CERTIFICATE}/${certificateId}?cb=${Date.now()}`;
    
    console.log("🚀 FORCING AXIOS NETWORK ROUTE TO:", targetUrl);

    const response = await axios.get(targetUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = `certificate-${certificateId}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.log("Error downloading certificate:", error);
  }
};
