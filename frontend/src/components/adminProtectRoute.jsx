import { Navigate } from "react-router-dom";
import useAuthStore from "../store/auth.js";

const AdminProtectRouter = ({ children }) => {
  const role = useAuthStore((state) => state.user.role);
  console.log("this is admin protect middleware ", role);
  if (role !== "admin") {
    return <Navigate to={"/"} />;
  }
  return children;
};

export default AdminProtectRouter;
