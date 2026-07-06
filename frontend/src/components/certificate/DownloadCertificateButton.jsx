import { Download } from "lucide-react";

export default function DownloadCertificateButton({
  onDownload,
}) {
  return (
    <button
      onClick={onDownload}
      className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
    >
      <Download size={20} />
      Download PDF
    </button>
  );
}