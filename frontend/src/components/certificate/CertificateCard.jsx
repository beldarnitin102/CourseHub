import { Award, CalendarDays, Hash } from "lucide-react";

import DownloadCertificateButton from "./DownloadCertificateButton";

export default function CertificateCard({
  certificate,
  onDownload,
}) {
  return (
    <div className="rounded-3xl bg-white p-10 shadow-xl">

      <div className="rounded-2xl border-[10px] border-blue-600 p-10">

        <div className="text-center">

          <h1 className="text-4xl font-bold text-blue-700">
            StudyNotion
          </h1>

          <h2 className="mt-5 text-3xl font-bold">
            Certificate of Completion
          </h2>

          <p className="mt-8 text-gray-600">
            This certificate is proudly presented to
          </p>

          <h3 className="mt-4 text-4xl font-bold text-slate-800">
            {certificate.student.fullName}
          </h3>

          <p className="mt-8 text-gray-600">
            for successfully completing
          </p>

          <h2 className="mt-4 text-3xl font-bold text-blue-600">
            {certificate.course.courseName}
          </h2>

        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">

          <div className="rounded-xl bg-slate-100 p-5">

            <CalendarDays className="mb-3 text-blue-600" />

            <p className="text-sm text-gray-500">
              Completion Date
            </p>

            <h3 className="font-semibold">
              {new Date(
                certificate.completionDate
              ).toLocaleDateString()}
            </h3>

          </div>

          <div className="rounded-xl bg-slate-100 p-5">

            <Hash className="mb-3 text-blue-600" />

            <p className="text-sm text-gray-500">
              Certificate ID
            </p>

            <h3 className="font-semibold">
              {certificate.certificateId}
            </h3>

          </div>

          <div className="rounded-xl bg-slate-100 p-5">

            <Award className="mb-3 text-blue-600" />

            <p className="text-sm text-gray-500">
              Instructor
            </p>

            <h3 className="font-semibold">
              {certificate.instructor.fullName}
            </h3>

          </div>

        </div>

        <div className="mt-10 flex justify-center">
          <DownloadCertificateButton
            onDownload={onDownload}
          />
        </div>

      </div>

    </div>
  );
}