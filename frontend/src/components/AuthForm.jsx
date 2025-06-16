import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../store/auth";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios";
const AuthForm = ({ type }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();
  const Mutate = useMutation({
    mutationFn: async () => {
      const url = type === "login" ? "/api/auth/login" : "/api/auth/register";
      const response = await api.post(url, form);
      return response.data;
    },
    onSuccess: (data) => {
      const { user } = data ?? {};
      console.log(data);
      setAuth({ user: user.email, token: data.token });
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log(error);
      alert(error?.response?.data?.message || "unknown Error");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    Mutate.mutate();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md w-96 space-y-4 flex flex-col items-center justify-center"
    >
      <h1 className="text-2xl font-bold">
        {type === "login" ? "Login" : "Create Acount"}
      </h1>
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="border rounded p-2 w-full"
        required
      />
      <input
        type="password"
        value={form.password}
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="border rounded p-2 w-full"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
        disabled={Mutate.isLoading}
      >
        {Mutate.isLoading
          ? "Loading..."
          : type === "login"
          ? "login"
          : "register"}
      </button>
      <p>
        {type === "login" ? (
          <>
            Don’t have an account?{" "}
            <Link className="text-blue-600" to="/Register">
              Register
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link className="text-blue-600" to="/Login">
              Login
            </Link>
          </>
        )}
      </p>
    </form>
  );
};

export default AuthForm;
