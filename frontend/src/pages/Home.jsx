import MainLayout from "../layouts/MainLayout";
import HeroSection from "../components/home/HeroSection";
import TrustedCompanies from "../components/home/TrustedCompanies";
import Categories from "../components/home/Categories";
import FeaturedCourses from "../components/home/FeaturedCourses";
import WhyChooseCourseHub from "../components/home/WhyChooseCourseHub";
import Testimonials from "../components/home/Testimonials";
import BecomeInstructor from "../components/home/BecomeInstructor";


export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <TrustedCompanies />
      <Categories />
        <FeaturedCourses />
         <WhyChooseCourseHub />
         <Testimonials />
<BecomeInstructor />

    </MainLayout>
  );
}