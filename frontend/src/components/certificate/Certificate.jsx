import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

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

  const response = await getCertificate(courseId, token);

  // Only assign state if the server explicitly confirms database record exists
  if (response && response.success) {
    setCertificate(response.data);
  } else {
    // Keeps state null so <LockedCertificate /> renders seamlessly
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