import {
  CheckCircle2,
  Loader2,
  AlertCircle,
  Clock,
  FileText,
  Type,
} from "lucide-react";

export default function NotesStatus({
  noteStatus,
  lastSaved,
  wordCount,
  characterCount,
}) {
  const getStatusIcon = () => {
    switch (noteStatus) {
      case "Saving...":
        return (
          <Loader2
            size={16}
            className="animate-spin text-amber-500"
          />
        );

      case "Saved":
        return (
          <CheckCircle2
            size={16}
            className="text-green-600"
          />
        );

      case "Failed":
        return (
          <AlertCircle
            size={16}
            className="text-red-500"
          />
        );

      default:
        return (
          <Clock
            size={16}
            className="text-slate-400"
          />
        );
    }
  };

  const getStatusColor = () => {
    switch (noteStatus) {
      case "Saving...":
        return "text-amber-500";

      case "Saved":
        return "text-green-600";

      case "Failed":
        return "text-red-500";

      default:
        return "text-slate-500";
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">

      {/* Left */}

      <div>

        <h3 className="text-xl font-bold text-slate-800">
          Personal Notes
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Everything you write here is automatically synced with your account.
        </p>

      </div>

      {/* Right */}

      <div className="flex flex-wrap items-center gap-6">

        {/* Save Status */}

        <div className="flex items-center gap-2">

          {getStatusIcon()}

          <span
            className={`text-sm font-semibold ${getStatusColor()}`}
          >
            {noteStatus}
          </span>

        </div>

        {/* Last Saved */}

        {lastSaved && (
          <div className="flex items-center gap-2 text-sm text-slate-500">

            <Clock size={16} />

            <span>
              {lastSaved.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>

          </div>
        )}

        {/* Words */}

        <div className="flex items-center gap-2 text-sm text-slate-500">

          <FileText size={16} />

          <span>
            {wordCount} Words
          </span>

        </div>

        {/* Characters */}

        <div className="flex items-center gap-2 text-sm text-slate-500">

          <Type size={16} />

          <span>
            {characterCount} Characters
          </span>

        </div>

      </div>

    </div>
  );
}