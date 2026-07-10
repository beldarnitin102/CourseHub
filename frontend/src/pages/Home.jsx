import MainLayout from "../layouts/MainLayout";
import HeroSection from "../components/home/HeroSection";
import Categories from "../components/home/Categories";
import WhyChooseCourseHub from "../components/home/WhyChooseCourseHub";
import Testimonials from "../components/home/Testimonials";
import BecomeInstructor from "../components/home/BecomeInstructor";

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />

      <Categories />

      <WhyChooseCourseHub />
      <Testimonials />
      <BecomeInstructor />
    </MainLayout>
  );
}
