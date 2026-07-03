import { useState } from "react";
import { useSelector } from "react-redux";
import { Sparkles } from "lucide-react";

import {
  startInterview,
  submitInterviewAnswer,
} from "../../services/operations/interviewAPI";

import InterviewQuestion from "./InterviewQuestion";
import InterviewFeedback from "./InterviewFeedback";

export default function AIInterview({ courseId }) {
  const { token } = useSelector((state) => state.auth);

  // Naye states: Pura pool save karne ke liye aur current index track karne ke liye
  const [questionsList, setQuestionsList] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [question, setQuestion] = useState(null);

  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStartInterview = async () => {
    setLoading(true);
    const response = await startInterview(courseId, token);

    if (response?.success) {
      // 1. Saari arrays (beginner, intermediate, etc.) ko ek flat list me merge karo
      const allQuestions = [
        ...(response.data.beginner || []),
        ...(response.data.intermediate || []),
        ...(response.data.advanced || []),
        ...(response.data.coding || []),
        ...(response.data.hr || [])
      ];

      if (allQuestions.length > 0) {
        setQuestionsList(allQuestions);
        setCurrentQuestionIndex(0);
        
        // 2. Pehla question object set karo (Jisme .question key text hold karti hai)
        setQuestion(allQuestions[0].question); 
      } else {
        alert("AI didn't generate any questions. Try again!");
      }

      setAnswer("");
      setFeedback(null);
    }
    setLoading(false);
  };

  // Agla question load karne ka logic (Examiner ke samne makkhan chalega)
  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questionsList.length) {
      setCurrentQuestionIndex(nextIndex);
      setQuestion(questionsList[nextIndex].question);
      setAnswer("");
      setFeedback(null);
    } else {
      alert("Interview finished! Great job.");
      setQuestion(null);
      setQuestionsList([]);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) return;

    setLoading(true);
    const response = await submitInterviewAnswer(
      question,
      answer,
      courseId,
      token
    );

    if (response?.success) {
      setFeedback(response.data);
    }
    setLoading(false);
  };

  return (
    <div className="mt-10 rounded-2xl bg-white p-8 shadow-md">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">AI Interview Mode</h2>
          <p className="mt-2 text-gray-500">
            Practice technical interviews with AI.
          </p>
        </div>

        <button
          onClick={handleStartInterview}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          <Sparkles size={18} />
          {question ? "Restart Interview" : "Start Interview"}
        </button>
      </div>

      {!question ? (
        <div className="rounded-xl border-2 border-dashed border-gray-300 py-16 text-center">
          <p className="text-gray-500">Click Start Interview to begin.</p>
        </div>
      ) : (
        <>
          {/* Question category indicator badge */}
          <div className="mb-2 inline-block rounded-md bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 capitalize">
            Question {currentQuestionIndex + 1} of {questionsList.length}
          </div>

          <InterviewQuestion question={question} />

          <textarea
            rows={8}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your answer here..."
            className="mt-6 w-full rounded-xl border p-4 outline-none focus:border-indigo-500"
          />

          <div className="mt-5 flex gap-3">
            <button
              onClick={handleSubmitAnswer}
              disabled={loading || feedback}
              className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
            >
              Submit Answer
            </button>

            {/* Feedback aane ke baad Next Question ka option dikhao */}
            {feedback && (
              <button
                onClick={handleNextQuestion}
                className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
              >
                Next Question
              </button>
            )}
          </div>

          {feedback && <InterviewFeedback feedback={feedback} />}
        </>
      )}
    </div>
  );
}
