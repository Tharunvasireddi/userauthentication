import { Link } from "react-router-dom";
import useAuthStore from "../store/auth";

const Home = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-gray-900 text-white p-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
        <h1 className="text-lg sm:text-xl font-bold mb-2 sm:mb-0">
          My Full Stack App
        </h1>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          {user ? (
            <Link
              to="/dashboard"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm sm:text-base text-center"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 text-sm sm:text-base text-center"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 text-sm sm:text-base text-center"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-[80vh] text-center px-2 sm:px-0">
        <h2 className="text-2xl sm:text-4xl font-bold mb-4">
          Welcome {user?.email ? `, ${user.email}` : "to the App!"}
        </h2>
        <p className="text-gray-600 max-w-xl text-sm sm:text-base">
          This is a simple yet powerful full-stack web application built using
          React on the frontend and Node.js with Express.js on the backend. It
          features a complete user authentication system with registration,
          login, and role-based access control (such as admin privileges). The
          application uses JWT (JSON Web Tokens) to protect private routes and
          ensures secure access to resources. For state management on the
          frontend, Zustand is used to maintain user sessions efficiently.
          Additionally, the app includes functionality for uploading images
          using Multer middleware, which are then stored and served from
          Cloudinary, a cloud-based image hosting service. Axios is used for API
          communication between the frontend and backend, and MongoDB with
          Mongoose is used as the database to manage users and uploaded images.
          The project is structured to demonstrate secure user flows, protected
          API routes, cloud file handling, and responsive frontend UI using
          Tailwind CSS, making it a great template for authentication-based
          applications with file upload and management features.
        </p>
      </main>
    </>
  );
};

export default Home;
