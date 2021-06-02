import Login from "./Views/Login";
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Dashboard from "./Views/Dashboard";
import ProtectedRoute from "./Components/Routes/ProtectedRoute";
import UnProtectedRoute from "./Components/Routes/UnProtectedRoute";
import { LoginFormProvider } from "./Context/LoginFormContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Switch>
          <UnProtectedRoute path="/login" component={LoginContextWrapper} />
          <ProtectedRoute component={Dashboard} />
        </Switch>
      </Router>
    </>
  );
}

const LoginContextWrapper = () => (
  <LoginFormProvider>
    <Login />
  </LoginFormProvider>
);

export default App;
