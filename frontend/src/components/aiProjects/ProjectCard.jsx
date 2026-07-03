import {
  Code2,
  BookOpen,
  Trophy,
  Layers,
} from "lucide-react";

export default function ProjectCard({ project }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">{project.title}</h3>
        <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
          {project.difficulty}
        </span>
      </div>

      <p className="mt-4 leading-7 text-gray-600">{project.description}</p>

      {/* Core Features & Requirements Container */}
      <div className="mt-6">
        <h4 className="mb-2 flex items-center gap-2 font-semibold text-slate-800">
          <BookOpen size={18} />
          Key Features
        </h4>

        <ul className="list-disc space-y-1 pl-6 text-gray-600">
          {/* ✅ FIXED: Changed 'project.requirements' to 'project.features' */}
          {project.features?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Tech Stack Array Section */}
      <div className="mt-6">
        <h4 className="mb-3 flex items-center gap-2 font-semibold text-slate-800">
          <Layers size={18} />
          Tech Stack
        </h4>
        <div className="flex flex-wrap gap-2">
          {project.techStack?.map((tech, index) => (
            <span
              key={index}
              className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Learning Outcome Information Box */}
      <div className="mt-6 rounded-xl bg-green-50 p-4">
        <div className="flex items-center gap-2 font-semibold text-green-800">
          <Trophy size={18} />
          Learning Outcome
        </div>
        <p className="mt-2 text-gray-700 text-sm leading-6">
          {project.learningOutcome}
        </p>
      </div>
    </div>
  );
}
