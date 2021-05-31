import { createContext, useState } from "react";

export const LOGIN_FORM = 'LOGIN';
export const REGISTERATION_FORM = 'REGISTER';

export const LoginFormContext = createContext();

export const LoginFormProvider = ({ children }) => {
  const [form, setForm] = useState(LOGIN_FORM);

  const showLoginForm = () => setForm(LOGIN_FORM);
  const showRegistrationForm = () => setForm(REGISTERATION_FORM);

  return (
    <LoginFormContext.Provider value={{
      form,
      showLoginForm,
      showRegistrationForm
    }}>
      {children}
    </LoginFormContext.Provider>
  );
}
