import { useState } from "react";

export default function AIMentor({
  onAsk,
  loading,
}) {

  const [question, setQuestion] = useState("");

  const handleSubmit = () => {

    if (!question.trim()) return;

    onAsk(question);

    setQuestion("");

  };

  return (

    <div className="rounded-2xl bg-white shadow-md p-6">

      <h2 className="text-2xl font-bold mb-5">
        🧠 AI Mentor
      </h2>

      <textarea
        rows={4}
        value={question}
        onChange={(e)=>setQuestion(e.target.value)}
        placeholder="Ask anything about this course..."
        className="w-full rounded-xl border p-4 outline-none focus:border-blue-500"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-5 rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
      >
        {
          loading
            ? "Thinking..."
            : "Ask Mentor"
        }
      </button>

    </div>

  );

}