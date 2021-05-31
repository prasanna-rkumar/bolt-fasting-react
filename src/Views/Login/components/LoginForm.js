import { useContext, useState } from "react";
import TextFormField from "../../../Components/TextFormField";
import { LoginFormContext } from "../../../Context/LoginFormContext";
import { AuthContext } from "../../../Context/AuthContext";


const LoginForm = () => {
  const { showRegistrationForm } = useContext(LoginFormContext);
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('prasannasrk07@gmail.com');
  const [password, setPassword] = useState('password');

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  }

  return (
    <>
      <div>
        <h1 className="text-3xl font-medium">Login</h1>
        <h6 className="text-gray-400">Don't have an account? <span onClick={() => showRegistrationForm()} className="text-purple-500 cursor-pointer">Register</span> </h6>
      </div>
      <form onSubmit={onSubmit} className="w-full">
        <TextFormField value={email} onChange={(e) => setEmail(e.target.value)} label="Email address" placeholder="ericsimon@ework.com" />
        <TextFormField value={password} onChange={(e) => setPassword(e.target.value)} type="password" label="Password" placeholder="your password" />
        <button className="bg-purple-500 text-white shadow-md rounded-lg w-full py-3" type="submit">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
