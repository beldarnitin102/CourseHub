import DashboardLayout from "../pages/dashboard/DashboardLayout";
import ProfileCard from "../components/dashboard/ProfileCard";
import { useSelector } from "react-redux";

export default function MyProfile() {
  
  const { user } = useSelector((state) => state.profile);

  const enrolledCourses = user?.courses?.length || 0;

  const completedCourses =
    user?.courses?.filter((course) => course.progress === 100).length || 0;

  const totalProgress =
    user?.courses?.reduce(
      (acc, course) => acc + (course.progress || 0),
      0
    ) || 0;
    
  const overallProgress =
    enrolledCourses > 0
      ? Math.round(totalProgress / enrolledCourses)
      : 0;

  return (
    <DashboardLayout>
      <h1 className="mb-8 text-4xl font-bold">
        My Profile
      </h1>

      {/* 3. Pass the values into the component here */}
      <ProfileCard 
        enrolledCourses={enrolledCourses}
        completedCourses={completedCourses}
        overallProgress={overallProgress}
      />
    </DashboardLayout>
  );
}
