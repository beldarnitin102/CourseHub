import { Lock, Trophy } from "lucide-react";

export default function LockedCertificate() {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center shadow-sm">

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
        <Lock size={34} className="text-gray-600" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-800">
        Certificate Locked
      </h2>

      <p className="mt-3 text-gray-600">
        Complete 100% of the course to unlock your
        professional completion certificate.
      </p>

      <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-yellow-100 px-5 py-2 text-yellow-700">
        <Trophy size={18} />
        Finish Course to Earn Certificate
      </div>

    </div>
  );
}