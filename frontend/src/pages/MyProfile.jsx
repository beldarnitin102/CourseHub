import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import ProfileCard from "../components/dashboard/ProfileCard";
// Import the profile API helper (Adjust the path if your folders match another layout)
import { getUserEnrolledCourses } from "../services/operations/profileAPI";

export default function MyProfile() {
  const { token } = useSelector((state) => state.auth);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await getUserEnrolledCourses(token);
        // Safely capture the array if wrapped inside an API object
        const coursesArray = response?.data || response || [];
        setCourses(Array.isArray(coursesArray) ? coursesArray : []);
      } catch (error) {
        console.error("Could not fetch enrolled courses:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchEnrolledCourses();
    }
  }, [token]);

  // Use the local 'courses' array fetched from the API instead of 'user?.courses'
  const enrolledCourses = courses.length || 0;

  // Check both 'progress' and 'progressPercentage' keys depending on your backend schema
  const completedCourses =
    courses.filter((course) => course.progressPercentage === 100 || course.progress === 100).length || 0;

  const totalProgress =
    courses.reduce(
      (acc, course) => acc + (course.progressPercentage || course.progress || 0),
      0
    ) || 0;
    
  const overallProgress =
    enrolledCourses > 0 ? Math.round(totalProgress / enrolledCourses) : 0;

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
