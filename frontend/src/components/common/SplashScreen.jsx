import { useEffect, useState } from "react";

const words = ["Learn.", "Build.", "Grow."];

export default function SplashScreen({ onFinish }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setIndex((prev) => {
        if (prev < words.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 600);

    const finishTimer = setTimeout(() => {
      // FIX: Check if onFinish is provided and is a valid function before calling it
      if (typeof onFinish === "function") {
        onFinish();
      } else {
        console.warn("SplashScreen: onFinish prop was not provided or is not a function.");
      }
    }, 2200);

    return () => {
      clearInterval(wordInterval);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#EEF4FF] via-[#F3F4F6] to-[#E8FFF5]">
      {/* Background Glow Effects */}
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-green-400/20 blur-3xl"></div>
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/10 blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Brand Name */}
        <h1 className="mb-4 text-5xl font-extrabold text-[#111827]">
          CourseHub
        </h1>

        {/* Divider */}
        <div className="mx-auto mb-8 h-[3px] w-40 rounded-full bg-[#2563EB]"></div>

        {/* Animated Text */}
        <p
          key={index}
          className="animate-pulse text-2xl font-semibold text-[#2563EB]"
        >
          {words[index]}
        </p>
      </div>
    </div>
  );
}