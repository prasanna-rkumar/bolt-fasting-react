import { useContext, useEffect, useState } from "react";
import TextFormField from "../../../Components/TextFormField";
import { LoginFormContext } from "../../../Context/LoginFormContext";
import { useMutation } from "../../../hooks/axios-query";
import { AuthContext } from "../../../Context/AuthContext";

const RegistrationForm = () => {
  const { showLoginForm } = useContext(LoginFormContext);
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [{ data }, register] = useMutation('/register', { email, password, name })

  useEffect(() => {
    if (data && data.email) {
      login(email, password)
    }
  }, [data, email, password, login])

  const onSubmit = (e) => {
    e.preventDefault();
    register();
  }
  return (
    <>
      <div>
        <h1 className="text-3xl font-medium">Register</h1>
        <h6 className="text-gray-500">Already have an account? <span onClick={() => showLoginForm()} className="text-primary cursor-pointer">Login</span> </h6>
      </div>
      <form onSubmit={onSubmit} className="w-full">
        <TextFormField value={name} onChange={(e) => setName(e.target.value)} label="Full name" placeholder="Eric Simon" />
        <TextFormField value={email} onChange={(e) => setEmail(e.target.value)} label="Email address" placeholder="ericsimon@ework.com" />
        <TextFormField value={password} onChange={(e) => setPassword(e.target.value)} type="password" label="Password" placeholder="Must have 6 characters" />

        <button className="bg-primary border-2 text-white shadow-md rounded-lg w-full py-3  focus:outline-none focus:ring focus:border-purple-300" type="submit">
          Register
        </button>
      </form>
    </>
  );
};

export default RegistrationForm;
