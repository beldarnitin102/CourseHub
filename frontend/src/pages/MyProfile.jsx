import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import ProfileCard from "../components/dashboard/ProfileCard";

import { getUserEnrolledCourses } from "../services/operations/profileAPI";
import { getCourseProgress } from "../services/operations/courseProgressAPI"; // 🌟 Added missing import

export default function MyProfile() {
  const { token } = useSelector((state) => state.auth);
  const [courses, setCourses] = useState([]);
  const [progressData, setProgressData] = useState({}); // 🌟 Replicated dashboard progress tracking map state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        // 1. Fetch user enrolled courses listing
        const enrolledCourses = await getUserEnrolledCourses(token);
        
        // Handle wrapper variations safely based on your api structure payload
        const coursesList = enrolledCourses?.data || enrolledCourses || [];
        
        if (Array.isArray(coursesList)) {
          setCourses(coursesList);

          // 2. Replicate dashboard loop to pull progress numbers for every course
          const progressMap = {};
          for (const course of coursesList) {
            if (course?._id) {
              const progress = await getCourseProgress(course._id, token);
              progressMap[course._id] = progress?.data || progress || {};
            }
          }
          setProgressData(progressMap);
        }
      } catch (error) {
        console.error("Could not synchronize profile metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfileData();
    }
  }, [token]);

  // 📈 Calculation Engine matching StudentDashboard exactly via useMemo optimizations
  const enrolledCourses = courses.length || 0;

  const { completedCourses, overallProgress } = useMemo(() => {
    let totalCalculatedProgress = 0;
    let completedCount = 0;

    courses.forEach((course) => {
      // Count individual lectures inside the current course object matrix
      const lecturesCount =
        course.courseContent?.reduce(
          (sum, sec) => sum + (sec.subSection?.length || 0),
          0
        ) || 0;

      // Extract completed elements from mapped API lookup state matching your dashboard keys
      const completedCountForCourse = progressData[course._id]?.completedVideos?.length || 0;

      // Evaluate precise course calculation strings
      const individualCourseProgress =
        lecturesCount > 0
          ? Math.round((completedCountForCourse / lecturesCount) * 100)
          : 0;

      totalCalculatedProgress += individualCourseProgress;

      if (individualCourseProgress === 100) {
        completedCount++;
      }
    });

    // Resolve mathematical values safely to prevent zero division exceptions
    const avgProgress =
      enrolledCourses > 0 ? Math.round(totalCalculatedProgress / enrolledCourses) : 0;

    return {
      completedCourses: completedCount,
      overallProgress: avgProgress,
    };
  }, [courses, progressData, enrolledCourses]);

  if (loading) {
    return (
      <DashboardLayout>
        <h1 className="text-3xl font-bold">Loading metrics...</h1>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="mb-8 text-4xl font-bold">My Profile</h1>

      <ProfileCard 
        enrolledCourses={enrolledCourses}
        completedCourses={completedCourses}
        overallProgress={overallProgress}
      />
    </DashboardLayout>
  );
}
