import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectRoute";
import Home from "./pages/Homepage";
import AdminProtectRouter from "./components/adminProtectRoute";
import UploadImages from "./components/uploadImage";
import GetImages from "./components/getImages";
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
