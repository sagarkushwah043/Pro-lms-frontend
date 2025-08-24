import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Courses from "./pages/Courses";
import EnrolledCourses from "./pages/EnrolledCourses";
import EnrolledCourseDetail from "./pages/EnrolledCoursesDetails"; // dynamic enrolled course page
import CourseDetails from "./pages/CourseDetails"; // other dynamic course page
import ProtectedRoute from "./components/ProtectedRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Single Navbar for all pages */}
      <Navbar />

      <div className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/about" element={<About />} />

          {/* Protected Routes */}
          <Route
            path="/homepage"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/:id"
            element={
              <ProtectedRoute>
                <CourseDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/enrolled"
            element={
              <ProtectedRoute>
                <EnrolledCourses />
              </ProtectedRoute>
            }
          />

          {/* Dynamic enrolled course detail page */}
          <Route
            path="/enrolled/:id"
            element={
              <ProtectedRoute>
                <EnrolledCourseDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
