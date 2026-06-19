import { useNavigate } from "react-router-dom";
import heroStudent from "../../assets/hero/hero-student.png";
import CountUpComponent from "react-countup";

// Fallback safety to check if it's nested inside an object default property
const CountUp = CountUpComponent.default || CountUpComponent;

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#F9FAFB]">
      {/* Changed py-20 to pt-20 pb-6 to push content tightly to the bottom feature bar */}
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          
          {/* Left Side */}
          <div>
            <h1 className="text-5xl font-bold leading-tight text-[#111827] lg:text-7xl">
              Learn Skills.
              <br />
              Build Your{" "}
              <span className="text-[#2563EB]">
                Future.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-gray-600">
              Explore 1000+ high-quality courses from expert
              instructors and advance your career with
              industry-ready learning.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/courses")}
                className="rounded-xl bg-[#2563EB] px-8 py-4 font-semibold text-white transition duration-300 hover:scale-105 cursor-pointer"
              >
                Explore Courses
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="rounded-xl border border-gray-300 bg-white px-8 py-4 font-semibold text-[#111827] transition hover:bg-gray-50 cursor-pointer"
              >
                Become Instructor
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="relative flex justify-center">
            <img
              src={heroStudent}
              alt="Student Learning"
              className="w-full max-w-lg"
            />

            {/* Students Card */}
            <div className="animate-float absolute right-0 top-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl min-w-[140px]">
              <div className="flex items-center gap-2">
                <span className="text-lg">👥</span>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Students</p>
              </div>
              <h3 className="mt-1 text-2xl font-bold text-[#111827]">
                {typeof CountUp === "function" ? (
                  <CountUp end={20} duration={2} suffix="K+" />
                ) : (
                  "20K+"
                )}
              </h3>
            </div>

            {/* Courses Card */}
            <div className="animate-float-delay absolute right-4 top-40 rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl min-w-[140px]">
              <div className="flex items-center gap-2">
                <span className="text-lg">📚</span>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</p>
              </div>
              <h3 className="mt-1 text-2xl font-bold text-[#2563EB]">
                {typeof CountUp === "function" ? (
                  <CountUp end={1000} duration={2.5} suffix="+" />
                ) : (
                  "1000+"
                )}
              </h3>
            </div>

            {/* Instructor Card */}
            <div className="animate-float-slow absolute right-12 top-72 rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl min-w-[140px]">
              <div className="flex items-center gap-2">
                <span className="text-lg">👨‍🏫</span>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Instructors</p>
              </div>
              <h3 className="mt-1 text-2xl font-bold text-[#111827]">
                {typeof CountUp === "function" ? (
                  <CountUp end={500} duration={3} suffix="+" />
                ) : (
                  "500+"
                )}
              </h3>
            </div>
          </div>

        </div>
      </div>

      {/* Feature Bar - Sits perfectly aligned with the hero components above */}
      <div className="border-t border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-4">
          <div className="flex flex-col gap-1">
            <h4 className="font-bold text-[#111827] flex items-center gap-2">🌐 Learn Anything</h4>
            <p className="text-sm text-gray-500">Courses across multiple domains.</p>
          </div>

          <div className="flex flex-col gap-1">
            <h4 className="font-bold text-[#111827] flex items-center gap-2">⭐ Expert Instructors</h4>
            <p className="text-sm text-gray-500">Learn from industry professionals.</p>
          </div>

          <div className="flex flex-col gap-1">
            <h4 className="font-bold text-[#111827] flex items-center gap-2">♾️ Lifetime Access</h4>
            <p className="text-sm text-gray-500">Learn at your own pace forever.</p>
          </div>

          <div className="flex flex-col gap-1">
            <h4 className="font-bold text-[#111827] flex items-center gap-2">📜 Certificate</h4>
            <p className="text-sm text-gray-500">Showcase your achievements.</p>
          </div>
        </div>
      </div>
    </section>
  );
}