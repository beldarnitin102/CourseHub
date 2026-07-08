import ReactMarkdown from "react-markdown";
import { Bot } from "lucide-react";

export default function MentorAnswer({ answer }) {
  if (!answer) return null;

  const markdown =
    typeof answer === "object"
      ? answer.answer
      : answer;

  if (!markdown) return null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center gap-4 border-b border-slate-100 px-8 py-5">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white">

          <Bot size={24} />

        </div>

        <div>

          <h3 className="text-xl font-bold text-slate-800">
            AI Mentor
          </h3>

          <p className="text-sm text-slate-500">
            Generated Response
          </p>

        </div>

      </div>

      {/* Response */}

      <div className="prose prose-slate max-w-none p-8">

        <ReactMarkdown>

          {markdown}

        </ReactMarkdown>

      </div>

    </div>
  );
}