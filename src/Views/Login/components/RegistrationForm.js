import { useContext, useEffect, useState } from "react";
import TextFormField from "../../../Components/TextFormField";
import { LoginFormContext } from "../../../Context/LoginFormContext";
import { useMutation } from "../../../hooks/axios-query";
import { auth } from "../../../firebase";
import { toast } from "react-toastify";

const RegistrationForm = () => {
  const { showLoginForm } = useContext(LoginFormContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [{ data }, register] = useMutation('/register', { email, password, name })

  useEffect(() => {
    if (data && data.email) {
      auth.signInWithEmailAndPassword(email, password)
    }
  }, [data, email, password])

  const onSubmit = (e) => {
    e.preventDefault();
    register()
      .then(() => auth.signInWithEmailAndPassword(email, password))
      .catch((err) => {
        const errorCode = err?.data?.error?.code
        if (errorCode) {
          switch(errorCode) {
            case 'auth/invalid-password':
              toast.error('Password must contain atleast 6 characters')
              break;
            case 'auth/email-already-exists':
              toast.error('User with this email already exists')
              break;
            default:
              break;
          }
        }
        console.log(err)
      })
  }
  return (
    <>
      <div>
        <h1 className="text-3xl font-medium">Register</h1>
        <h6 className="text-gray-500">Already have an account? <span onClick={() => showLoginForm()} className="text-primary cursor-pointer">Login</span> </h6>
      </div>
      <form onSubmit={onSubmit} className="w-full">
        <TextFormField required value={name} onChange={(e) => setName(e.target.value)} label="Full name" placeholder="Eric Simon" />
        <TextFormField required value={email} onChange={(e) => setEmail(e.target.value)} label="Email address" placeholder="ericsimon@ework.com" />
        <TextFormField required value={password} onChange={(e) => setPassword(e.target.value)} type="password" label="Password" placeholder="Must have 6 characters" />

        <button className="bg-primary border-2 text-white shadow-md rounded-lg w-full py-3  focus:outline-none focus:ring focus:border-purple-300" type="submit">
          Register
        </button>
      </form>
    </>
  );
};

export default RegistrationForm;
