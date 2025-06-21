import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../store/auth";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios";

const AuthForm = ({ type }) => {
  const isLogin = type === "login";

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      const url = isLogin ? "/api/auth/login" : "/api/auth/register";
      const payload = isLogin
        ? { username: form.username, password: form.password }
        : form;

      const response = await api.post(url, payload);
      return response.data;
    },
    onSuccess: (data) => {
      if (isLogin) {
        setAuth({ user: data.user, token: data.token });
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    },
    onError: (error) => {
      alert(error?.response?.data?.message || "Unknown error occurred");
    },
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-2 sm:px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-4 sm:p-8 w-full max-w-xs sm:max-w-md md:max-w-lg space-y-6 flex flex-col"
        autoComplete="off"
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center mb-2 tracking-tight">
          {isLogin ? "Sign In" : "Create Account"}
        </h1>
        <p className="text-center text-gray-500 mb-4 text-sm sm:text-base">
          {isLogin
            ? "Welcome back! please enter your credentials."
            : "Register a new account to get started"}
        </p>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="your username"
              value={form.username}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm sm:text-base"
              required
              autoFocus
            />
          </div>
          {!isLogin && (
            <>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm sm:text-base"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Role
                </label>
                <input
                  id="role"
                  name="role"
                  type="text"
                  placeholder="e.g., user or admin"
                  value={form.role}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm sm:text-base"
                  required
                />
                <span className="text-xs text-gray-400">
                  Choose your role for access level.
                </span>
              </div>
            </>
          )}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              password
            </label>
            <input
              id="password"
              name="password"
              type="text"
              placeholder="your password"
              value={form.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm sm:text-base"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow transition disabled:opacity-60 text-sm sm:text-base"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading
            ? isLogin
              ? "Signing in..."
              : "Registering..."
            : isLogin
            ? "Sign In"
            : "Register"}
        </button>
        <div className="text-center text-xs sm:text-sm mt-2">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <Link
                className="text-indigo-600 hover:underline font-medium"
                to="/register"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link
                className="text-indigo-600 hover:underline font-medium"
                to="/login"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
