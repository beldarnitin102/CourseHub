import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Brain,
  BookOpen,
  FolderGit2,
  FileText,
  Briefcase,
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

  useEffect(() => {

    fetchRecommendations();

  }, []);

  const fetchRecommendations = async () => {

    setLoading(true);

    const response = await getRecommendations(
      {
        courseId,
        completedSections,
        progress,
      },
      token
    );

    if (response?.success) {

      setRecommendations(response.data);

    }

    setLoading(false);

  };

  if (loading) {

    return (

      <div className="mt-10 rounded-2xl bg-white p-8 shadow-md">

        Loading AI Recommendations...

      </div>

    );

  }

  if (!recommendations) return null;

  

  return (

    <div className="mt-10 rounded-2xl bg-white p-8 shadow-md">

      <h2 className="mb-8 text-3xl font-bold">

        AI Learning Recommendations

      </h2>

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

        <h3 className="mb-3 text-xl font-bold">

          Career Advice

        </h3>

        <p className="leading-8 text-gray-700">

          {recommendations.careerAdvice}

        </p>

      </div>

    </div>

  );

}

function Section({

  icon,

  title,

  items,

}) {

  return (

    <div className="mb-8">

      <div className="mb-3 flex items-center gap-2">

        {icon}

        <h3 className="text-xl font-bold">

          {title}

        </h3>

      </div>

      <ul className="space-y-2 pl-8 list-disc">

        {items?.map((item, index) => (

          <li key={index}>

            {item}

          </li>

        ))}

      </ul>

    </div>

  );

}