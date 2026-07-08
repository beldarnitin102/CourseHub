import { useEffect, useRef, useState } from "react";
import { Bot, User, Send, Sparkles, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export default function AIMentor({ loading, onAsk }) {
  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([
    {
      type: "assistant",
      text: "Hi 👋 I'm your AI Mentor. Ask me anything about this lecture, concepts, interview questions, or real-world examples.",
    },
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSubmit = async () => {
    if (!question.trim()) return;

    const userMessage = question;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: userMessage,
      },
    ]);

    setQuestion("");

    const response = await onAsk(userMessage);

    setMessages((prev) => [
      ...prev,
      {
        type: "assistant",
        text:
          response?.answer ||
          response?.data ||
          response ||
          "Sorry, I couldn't generate an answer.",
      },
    ]);
  };

  const suggestions = [
    "Explain this topic in simple words",
    "Give me interview questions",
    "Summarize this lecture",
    "Real-world example",
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}

      <div className="flex items-center gap-3 border-b px-6 py-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100">
          <Bot className="text-violet-600" />
        </div>

        <div>
          <h3 className="font-semibold text-slate-800">AI Mentor</h3>

          <p className="text-sm text-slate-500">
            Learn faster with personalized explanations
          </p>
        </div>
      </div>

      {/* Suggestions */}

      <div className="flex flex-wrap gap-2 border-b p-5">
        {suggestions.map((item) => (
          <button
            key={item}
            onClick={() => setQuestion(item)}
            className="rounded-full border bg-slate-50 px-4 py-2 text-sm transition hover:bg-violet-50 hover:border-violet-300"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Chat */}

      <div className="h-[420px] overflow-y-auto px-6 py-5 space-y-5">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex max-w-[80%] gap-3 ${
                msg.type === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full

                ${
                  msg.type === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-violet-100 text-violet-700"
                }`}
              >
                {msg.type === "user" ? <User size={18} /> : <Bot size={18} />}
              </div>

              <div
                className={`rounded-2xl px-5 py-4 text-[15px] leading-7
    ${
      msg.type === "user"
        ? "bg-blue-600 text-white"
        : "bg-slate-100 text-slate-700"
    }`}
              >
                {msg.type === "assistant" ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                  >
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100">
              <Bot size={18} className="text-violet-700" />
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-4">
              <Loader2 className="animate-spin" size={18} />

              <span>Thinking...</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}

      <div className="border-t p-5">
        <div className="flex gap-3">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            placeholder="Ask anything about this lecture..."
            className="flex-1 rounded-xl border px-5 py-3 outline-none transition focus:border-violet-500"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60"
          >
            <Send size={18} />
            Ask
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
          <Sparkles size={14} />
          AI answers may occasionally make mistakes. Verify important
          information.
        </div>
      </div>
    </div>
  );
}
