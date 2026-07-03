import { useState } from "react";
import { useSelector } from "react-redux";
import { Sparkles, FolderGit2 } from "lucide-react";

import { generateProjects } from "../../services/operations/projectAPI";
import ProjectCard from "./ProjectCard";

export default function AIProjects({ courseId }) {
  const { token } = useSelector((state) => state.auth);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerateProjects = async () => {
    setLoading(true);

    const response = await generateProjects(courseId, token);

    if (response?.success) {
      // Access data directly since the backend controller already maps array output straight to 'data'
      setProjects(response.data || []);
    }
    setLoading(false);
  };

  return (
    <div className="mt-10 rounded-2xl bg-white p-8 shadow-md">
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <FolderGit2 size={30} className="text-purple-600" />

            <h2 className="text-3xl font-bold">AI Project Generator</h2>
          </div>

          <p className="mt-2 text-gray-500">
            Practice with real-world projects generated from your course.
          </p>
        </div>

        <button
          onClick={handleGenerateProjects}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:opacity-60"
        >
          <Sparkles size={18} />

          {loading
            ? "Generating..."
            : projects.length
              ? "Regenerate"
              : "Generate"}
        </button>
      </div>

      {!loading && projects.length === 0 && (
        <div className="rounded-xl border-2 border-dashed border-gray-300 py-16 text-center">
          <FolderGit2 size={50} className="mx-auto mb-4 text-gray-400" />

          <h3 className="text-xl font-semibold">No Projects Generated</h3>

          <p className="mt-2 text-gray-500">
            Click Generate to create personalized projects.
          </p>
        </div>
      )}

      {projects.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
