import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}