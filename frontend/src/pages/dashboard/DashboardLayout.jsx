import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <div className="flex">

        <Sidebar />

        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>

      </div>
    </div>
  );
}