import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Courses from "./pages/Courses";
import EnrolledCourses from "./pages/EnrolledCourses";
import EnrolledCourseDetail from "./pages/EnrolledCoursesDetails"; 
import CourseDetails from "./pages/CourseDetails"; 
import ProtectedRoute from "./components/ProtectedRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./pages/Page-not-found";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
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
          <Route
            path="/enrolled/:id"
            element={
              <ProtectedRoute>
                <EnrolledCourseDetail />
              </ProtectedRoute>
            }
          />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
