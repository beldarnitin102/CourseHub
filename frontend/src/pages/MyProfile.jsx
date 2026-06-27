import DashboardLayout from "../pages/dashboard/DashboardLayout";
import ProfileCard from "../components/dashboard/ProfileCard";

export default function MyProfile() {
  
  return (
    <DashboardLayout>
      <h1 className="mb-8 text-4xl font-bold">
        My Profile
      </h1>

      <ProfileCard />
    </DashboardLayout>
  );
}