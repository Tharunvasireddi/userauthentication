import { Navigate } from "react-router-dom";
import useAuthStore from "../store/auth";

const ProtectedRoute = ({ children }) => {
  const token = useAuthStore.getState().token;
  console.log("this is protect token", token);
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
