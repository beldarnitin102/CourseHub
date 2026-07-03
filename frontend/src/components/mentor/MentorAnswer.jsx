import ReactMarkdown from "react-markdown";

export default function MentorAnswer({ answer }) {
  // 1. Immediately return null if answer is undefined, null, or false
  if (!answer) return null;

  // 2. Now it is 100% safe to check if it's an object
  const markdownText = typeof answer === "object" ? answer.answer : answer;

  // 3. Extra safety check in case answer.answer itself is missing
  if (!markdownText) return null;

  return (
    <div className="rounded-2xl bg-white shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">
        AI Mentor Response
      </h2>
      <div className="prose max-w-none text-gray-800 space-y-4">
        <ReactMarkdown>{markdownText}</ReactMarkdown>
      </div>
    </div>
  );
}
