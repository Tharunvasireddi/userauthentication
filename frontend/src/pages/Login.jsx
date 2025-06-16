import AuthForm from "../components/AuthForm.jsx"

const Login = ()=>{
    return (
      <div className=" bg-cyan-600  flex flex-col items-center justify-center h-screen w-full">
          <AuthForm type={"login"}/>
      </div>
    )
}

export default Login