import { Link } from "react-router-dom";
import useAuthStore from "../store/auth";

const Home = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">My Full Stack App</h1>
        <div>
          {user ? (
            <Link
              to="/dashboard"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="mr-4 border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center h-[80vh] text-center">
        <h2 className="text-4xl font-bold mb-4">
          Welcome {user?.email ? `, ${user.email}` : "to the App!"}
        </h2>
        <p className="text-gray-600 max-w-xl">
          This is a simple full-stack application with user authentication,
          protected routes, and API integration using React, Express, MongoDB,
          and Zustand.
        </p>
      </main>
    </>
  );
};

export default Home;
