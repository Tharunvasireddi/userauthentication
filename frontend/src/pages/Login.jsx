import AuthForm from "../components/AuthForm.jsx"

const Login = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-cyan-100 via-blue-100 to-indigo-200 px-2 sm:px-4">
      <div className="w-full max-w-xs sm:max-w-md">
        <AuthForm type="login" />
      </div>
    </div>
  );
};

export default Login;