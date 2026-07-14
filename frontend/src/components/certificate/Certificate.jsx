import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { apiConnector } from "../../services/apiconnector"; 

import {
  getCertificate,
  downloadCertificate,
} from "../../services/operations/certificateAPI";

import LockedCertificate from "../../components/certificate/LockedCertificate";
import CertificateCard from "../../components/certificate/CertificateCard";

export default function Certificate() {
  const { courseId } = useParams();

  const { token } = useSelector(
    (state) => state.auth
  );

  const [certificate, setCertificate] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

 useEffect(() => {
  if (courseId) {
    fetchCertificate();
  }
}, [courseId]); // Add courseId here

const fetchCertificate = async () => {
  setLoading(true);

  // 1. Try to fetch an existing certificate first
  let response = await getCertificate(courseId, token);

  // 2. If it doesn't exist (returns false/null), automatically try to generate it
  if (!response || !response.success) {
    console.log("ℹ️ Certificate not found. Attempting automatic generation...");
    
    try {
      // Direct call to your backend generate route
      const generateResponse = await apiConnector(
        "POST",
        `${import.meta.env.VITE_APP_BASE_URL}/certificate/generate`, // Make sure port matches your server
        { courseId },
        { Authorization: `Bearer ${token}` }
      );

      if (generateResponse?.data?.success) {
        console.log("✅ Certificate automatically generated successfully!");
        response = generateResponse.data; // Assign the newly generated certificate data
      }
    } catch (error) {
      console.log("❌ Auto-generation skipped:", error.response?.data?.message || error.message);
    }
  }

  // 3. Update the state with whatever layout data we resolved
  if (response && response.success) {
    setCertificate(response.data);
  } else {
    // If progress is not 100%, it falls back to the Locked screen layout smoothly
    setCertificate(null); 
  }

  setLoading(false);
};

  const handleDownload = async () => {
  // Ensure certificate data exists and pass its specific database ID
  if (certificate?._id) {
    await downloadCertificate(certificate._id, token);
  } else {
    console.error("No certificate ID found to download");
  }
};

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-10">

      {certificate ? (
        <CertificateCard
          certificate={certificate}
          onDownload={handleDownload}
        />
      ) : (
        <LockedCertificate />
      )}

    </div>
  );
}