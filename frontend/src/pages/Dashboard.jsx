import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth";

const Dashboard = () => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 px-2 sm:px-4">
      <section className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-4 sm:p-8 w-full max-w-xs sm:max-w-lg flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-700 mb-2 tracking-tight text-center">
          Welcome{user?.username ? `, ${user.username}` : "!"}
        </h1>
        <p className="text-gray-600 mb-8 text-center text-sm sm:text-base">
          You are now logged in. Explore your dashboard and manage your account.
        </p>
        <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4">
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition mt-2 sm:mt-4 w-full"
            onClick={handleLogout}
          >
            Logout
          </button>
          <Link
            to="/getAll"
            className="bg-green-500 hover:bg-amber-600 text-white font-semibold px-6 py-2 rounded-lg transition mt-2 sm:mt-4 w-full text-center"
          >
            Images
          </Link>
          {user.role === "admin" && (
            <Link
              to="/upload"
              className="bg-green-500 hover:bg-amber-600 text-white font-semibold px-6 py-2 rounded-lg transition mt-2 sm:mt-4 w-full text-center"
            >
              Upload
            </Link>
          )}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
