import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectRoute.jsx";
import Home from "./pages/Homepage.jsx";
import AdminProtectRouter from "./components/adminProtectRoute.jsx";
import UploadImages from "./components/uploadImage.jsx";
import GetImages from "./components/getImages.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <AdminProtectRouter>
              <UploadImages />
            </AdminProtectRouter>
          </ProtectedRoute>
        }
      />
      <Route
        path="/getAll"
        element={
          <ProtectedRoute>
            <GetImages />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
