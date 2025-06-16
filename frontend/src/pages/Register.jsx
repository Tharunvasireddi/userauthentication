import AuthForm from "../components/AuthForm";

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen  bg-cyan-600">
        <AuthForm type={"register"}/>
    </div>
  );
};


export default Register