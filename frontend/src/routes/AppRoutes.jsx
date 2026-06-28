import { Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

// Course Pages
import CourseDetails from "../pages/course/CourseDetails";
import ViewCourse from "../pages/course/ViewCourse";

// Dashboard Pages
import StudentDashboard from "../pages/dashboard/StudentDashboard";
import InstructorDashboard from "../pages/dashboard/InstructorDashboard";
import MyCourses from "../pages/dashboard/MyCourses";
import Settings from "../pages/dashboard/Settings";

// Profile & Cart
import Profile from "../pages/profile/Profile";
import Cart from "../pages/cart/Cart";

// Instructor Course Pages
import CreateCourse from "../pages/dashboard/instructor/CreateCourse";
import CourseBuilder from "../pages/dashboard/instructor/CourseBuilder";

// Protected Routes
import PrivateRoute from "../components/auth/PrivateRoute";
import StudentRoute from "../components/auth/StudentRoute";
import InstructorRoute from "../components/auth/InstructorRoute";
import Courses from "../pages/course/Courses";
import About from "../pages/About";
import Contact from "../pages/Contact";
import MyProfile from "../pages/MyProfile";
import InstructorCourses from "../pages/dashboard/instructor/InstructorCourses";
import EditCourse from "../pages/dashboard/instructor/EditCourse";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import AIGenerateCourse from "../pages/dashboard/AIGenerateCourse";
import AdminRoute from "../components/auth/AdminRoute";
import Analytics from "../pages/Admin/Analytics";
import Dashboard from "../pages/Admin/Dashboard";
import Users from "../pages/Admin/Users";
import Categories from "../pages/Admin/Categories";
import InstructorDetails from "../pages/Admin/InstructorDetails";
import StudentDetails from "../pages/Admin/StudentDetails";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/update-password/:token" element={<ResetPassword />} />

      <Route
        path="/dashboard/course/:courseId"
        element={
          <DashboardLayout>
            <CourseDetails />
          </DashboardLayout>
        }
      />

      <Route
        path="/courses"
        element={
          <MainLayout>
            <Courses />
          </MainLayout>
        }
      />

      <Route
        path="/course/:courseId"
        element={
          <MainLayout>
            <CourseDetails />
          </MainLayout>
        }
      />

      <Route
        path="/dashboard/profile"
        element={
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />

      {/* ================= STUDENT PROTECTED ================= */}

      <Route
        path="/dashboard/student"
        element={
          <PrivateRoute>
            <StudentRoute>
              <StudentDashboard />
            </StudentRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/my-courses"
        element={
          <PrivateRoute>
            <StudentRoute>
              <MyCourses />
            </StudentRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/courses"
        element={
          <DashboardLayout>
            <Courses />
          </DashboardLayout>
        }
      />

      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <StudentRoute>
              <Cart />
            </StudentRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/view-course/:courseId"
        element={
          <PrivateRoute>
            <StudentRoute>
              <ViewCourse />
            </StudentRoute>
          </PrivateRoute>
        }
      />

      {/* ================= INSTRUCTOR PROTECTED ================= */}

      <Route
        path="/dashboard/instructor"
        element={
          <PrivateRoute>
            <InstructorRoute>
              <InstructorDashboard />
            </InstructorRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/create-course"
        element={
          <PrivateRoute>
            <InstructorRoute>
              <CreateCourse />
            </InstructorRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/course-builder"
        element={
          <PrivateRoute>
            <InstructorRoute>
              <CourseBuilder />
            </InstructorRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/instructor-courses"
        element={
          <PrivateRoute>
            <InstructorRoute>
              <InstructorCourses />
            </InstructorRoute>
          </PrivateRoute>
        }
      />

      {/* ================= COMMON PROTECTED ================= */}

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />

      {/* ================= FALLBACK ================= */}

      <Route path="*" element={<Navigate to="/" replace />} />

      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/dashboard/edit-course/:courseId" element={<EditCourse />} />

      <Route
        path="/dashboard/ai-course-generator"
        element={<AIGenerateCourse />}
      />

      <Route
        path="/dashboard/admin"
        element={
          <PrivateRoute>
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/admin/users"
        element={
          <PrivateRoute>
            <AdminRoute>
              <Users />
            </AdminRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/admin/courses"
        element={
          <PrivateRoute>
            <AdminRoute>
              <Courses />
            </AdminRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/admin/categories"
        element={
          <PrivateRoute>
            <AdminRoute>
              <Categories />
            </AdminRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/admin/analytics"
        element={
          <PrivateRoute>
            <AdminRoute>
              <Analytics />
            </AdminRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/admin/instructor/:id"
        element={
          <PrivateRoute>
            <AdminRoute>
              <InstructorDetails />
            </AdminRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/admin/student/:id"
        element={
          <PrivateRoute>
            <AdminRoute>
              <StudentDetails />
            </AdminRoute>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
