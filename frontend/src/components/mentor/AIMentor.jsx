import { useState } from "react";
import {
  Sparkles,
  Send,
  BrainCircuit,
} from "lucide-react";

export default function AIMentor({
  onAsk,
  loading,
}) {
  const [question, setQuestion] = useState("");

  const suggestions = [
    "Explain this lecture in simple words",
    "Give me interview questions",
    "Summarize this topic",
    "Create MCQs from this lecture",
  ];

  const handleSubmit = () => {
    if (!question.trim()) return;

    onAsk(question);
    setQuestion("");
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-100 px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg">
            <BrainCircuit size={28} />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              AI Mentor
            </h2>

            <p className="text-sm text-slate-500">
              Ask anything about this lecture
            </p>

          </div>

        </div>

        <span className="rounded-full bg-green-100 px-4 py-1 text-xs font-semibold text-green-700">
          ● Online
        </span>

      </div>

      {/* Suggestions */}

      <div className="px-8 pt-6">

        <p className="mb-3 text-sm font-semibold text-slate-700">
          Quick Suggestions
        </p>

        <div className="flex flex-wrap gap-3">

          {suggestions.map((item) => (
            <button
              key={item}
              onClick={() => setQuestion(item)}
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700"
            >
              {item}
            </button>
          ))}

        </div>

      </div>

      {/* Input */}

      <div className="px-8 py-6">

        <textarea
          rows={6}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Example: Explain closures in JavaScript with real-world examples..."
          className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-5 text-[15px] outline-none transition focus:border-violet-500 focus:bg-white"
        />

        <div className="mt-6 flex items-center justify-between">

          <p className="text-sm text-slate-400">
            AI may occasionally make mistakes.
          </p>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Sparkles className="animate-spin" size={18} />
                Thinking...
              </>
            ) : (
              <>
                <Send size={18} />
                Ask Mentor
              </>
            )}
          </button>

        </div>

      </div>

    </div>
  );
}