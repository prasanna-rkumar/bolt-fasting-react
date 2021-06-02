import { useContext, useState } from "react";
import { toast } from "react-toastify";
import TextFormField from "../../../Components/TextFormField";
import { LoginFormContext } from "../../../Context/LoginFormContext";
import { auth } from "../../../firebase";


const LoginForm = () => {
  const { showRegistrationForm } = useContext(LoginFormContext);

  const [email, setEmail] = useState('prasannasrk07@gmail.com');
  const [password, setPassword] = useState('password');

  const onSubmit = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then()
      .catch((err) => {
        console.log(err)
        if (err.code === 'auth/user-not-found') {
          toast.error('The Email id does not exist')
          setEmail('')
          setPassword('')
        } else if (err.code === 'auth/wrong-password') {
          toast.error('Incorret password')
          setPassword('')
        }
      })
  }

  return (
    <>
      <div>
        <h1 className="text-3xl font-medium">Login</h1>
        <h6 className="text-gray-500">Don't have an account? <span onClick={() => showRegistrationForm()} className="text-primary cursor-pointer">Register</span> </h6>
      </div>
      <form onSubmit={onSubmit} className="w-full">
        <TextFormField required value={email} onChange={(e) => setEmail(e.target.value)} label="Email address" placeholder="ericsimon@ework.com" />
        <TextFormField required value={password} onChange={(e) => setPassword(e.target.value)} type="password" label="Password" placeholder="your password" />
        <button className="bg-primary text-white shadow-md rounded-lg w-full py-3" type="submit">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
