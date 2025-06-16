import { useNavigate } from "react-router-dom";
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
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Welcome,{user}
        {/* // user !== null && user !== undefined ? user.email : undefined */}
      </h1>
      <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
        onClick={handleLogout}
      >
        logout
      </button>
    </div>
  );
};

export default Dashboard;
