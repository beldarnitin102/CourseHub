import { Award, CalendarDays, Hash } from "lucide-react";
import DownloadCertificateButton from "./DownloadCertificateButton";

export default function CertificateCard({ certificate, onDownload }) {
  // Graceful fallback variables to prevent component break down
  const studentName = certificate?.student 
    ? `${certificate.student.firstName} ${certificate.student.lastName}`
    : "Student";

  const instructorName = certificate?.instructor 
    ? `${certificate.instructor.firstName} ${certificate.instructor.lastName}`
    : "Instructor";

  return (
    <div className="rounded-3xl bg-white p-10 shadow-xl">
      <div className="rounded-2xl border-[10px] border-blue-600 p-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-700">StudyNotion</h1>
          <h2 className="mt-5 text-3xl font-bold">Certificate of Completion</h2>
          <p className="mt-8 text-gray-600">This certificate is proudly presented to</p>
          
          {/* FIXED: Using calculated combined string variable */}
          <h3 className="mt-4 text-4xl font-bold text-slate-800">{studentName}</h3>

          <p className="mt-8 text-gray-600">for successfully completing</p>
          <h2 className="mt-4 text-3xl font-bold text-blue-600">{certificate?.course?.courseName || "Course"}</h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-slate-100 p-5">
            <CalendarDays className="mb-3 text-blue-600" />
            <p className="text-sm text-gray-500">Completion Date</p>
            <h3 className="font-semibold">
              {certificate?.completionDate ? new Date(certificate.completionDate).toLocaleDateString() : "N/A"}
            </h3>
          </div>

          <div className="rounded-xl bg-slate-100 p-5">
            <Hash className="mb-3 text-blue-600" />
            <p className="text-sm text-gray-500">Certificate ID</p>
            <h3 className="font-semibold">{certificate?.certificateId || "N/A"}</h3>
          </div>

          <div className="rounded-xl bg-slate-100 p-5">
            <Award className="mb-3 text-blue-600" />
            <p className="text-sm text-gray-500">Instructor</p>
            
            {/* FIXED: Using calculated combined string variable */}
            <h3 className="font-semibold">{instructorName}</h3>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <DownloadCertificateButton onDownload={onDownload} />
        </div>
      </div>
    </div>
  );
}
