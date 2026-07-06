import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Brain,
  BookOpen,
  FolderGit2,
  FileText,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { getRecommendations } from "../../services/operations/recommendationAPI";

export default function AIRecommendations({
  courseId,
  completedSections,
  progress,
}) {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  const fetchRecommendations = async () => {
    setLoading(true);
    const response = await getRecommendations(
      { courseId, completedSections, progress },
      token,
    );
    if (response?.success) {
      setRecommendations(response.data);
    }
    setLoading(false);
  };

  // Initial UI state before user requests recommendations
  if (!recommendations && !loading) {
    return (
      <div className="mt-10 rounded-2xl bg-white p-8 text-center shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Personalized AI Insights</h2>
        <p className="mb-6 text-gray-600">
          Get tailored skill recommendations, project ideas, and career advice
          based on your current progress.
        </p>
        <button
          onClick={fetchRecommendations}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition-all hover:bg-indigo-700 shadow-lg shadow-indigo-100"
        >
          <Sparkles className="h-5 w-5" />
          Generate AI Recommendations
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mt-10 animate-pulse rounded-2xl bg-white p-8 text-center font-medium text-gray-600 shadow-md">
        Analyzing your progress and generating insights...
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-2xl bg-white p-8 shadow-md">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <h2 className="text-3xl font-bold"> AI Learning Recommendations </h2>
        <button
          onClick={fetchRecommendations}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <Sparkles className="h-4 w-4" />
          Regenerate
        </button>
      </div>

      {/* Next Skills */}
      <Section
        icon={<Brain className="text-indigo-600" />}
        title="Next Skills"
        items={recommendations.nextSkills}
      />

      {/* Courses */}
      <Section
        icon={<BookOpen className="text-green-600" />}
        title="Recommended Courses"
        items={recommendations.recommendedCourses}
      />

      {/* Projects */}
      <Section
        icon={<FolderGit2 className="text-orange-600" />}
        title="Recommended Projects"
        items={recommendations.recommendedProjects}
      />

      {/* Docs */}
      <Section
        icon={<FileText className="text-blue-600" />}
        title="Documentation"
        items={recommendations.documentation}
      />

      {/* Interview */}
      <Section
        icon={<Briefcase className="text-red-600" />}
        title="Interview Topics"
        items={recommendations.interviewTopics}
      />

      {/* Advice */}
      <div className="mt-8 rounded-xl bg-slate-100 p-6">
        <h3 className="mb-3 text-xl font-bold"> Career Advice </h3>
        <p className="leading-8 text-gray-700">
          {" "}
          {recommendations.careerAdvice}{" "}
        </p>
      </div>
    </div>
  );
}

function Section({ icon, title, items }) {
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center gap-2">
        {icon}
        <h3 className="text-xl font-bold"> {title} </h3>
      </div>
      <ul className="space-y-2 pl-8 list-disc">
        {items?.map((item, index) => (
          <li key={index}> {item} </li>
        ))}
      </ul>
    </div>
  );
}
