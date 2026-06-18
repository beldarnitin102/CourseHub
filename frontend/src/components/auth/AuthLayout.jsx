import LearningDashboard from "./LearningDashboard";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F3F4F6]">

      <div className="mx-auto max-w-7xl px-6">

        <div className="grid min-h-screen gap-12 lg:grid-cols-[0.9fr_1.1fr]">

          <div className="hidden lg:flex">
            <LearningDashboard />
          </div>

          <div className="flex items-center justify-center py-10">
            {children}
          </div>

        </div>

      </div>

    </div>
  );
}