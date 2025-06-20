import AuthForm from "../components/AuthForm";

const Register = () => {
  return (
  <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-cyan-100 via-blue-100 to-indigo-200">
      <div className="w-full max-w-md">
        <AuthForm type="register" />
      </div>
    </div>
  );
};


export default Register