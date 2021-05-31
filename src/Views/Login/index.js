import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import { useContext } from 'react';
import { LoginFormContext, REGISTERATION_FORM } from '../../Context/LoginFormContext';

const Login = () => {
  const { form } = useContext(LoginFormContext);
  return (
    <div className="flex flex-col justify-start items-start bg-white rounded-2xl pt-4 pb-8 px-4 shadow-xl max-w-md mx-auto gap-y-2 relative top-16">
      { form === REGISTERATION_FORM ? (
        <RegistrationForm />
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default Login;
