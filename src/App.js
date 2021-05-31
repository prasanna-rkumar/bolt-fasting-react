import Login from "./Views/Login";
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Dashboard from "./Views/Dashboard";
import ProtectedRoute from "./Components/Routes/ProtectedRoute";
import UnProtectedRoute from "./Components/Routes/UnProtectedRoute";
import { AuthProvider } from "./Context/AuthContext";
import { AxiosProvidder } from "./Context/AxiosContext";
import { LoginFormProvider } from "./Context/LoginFormContext";

function App() {
  return (
    <AuthProvider>
      <AxiosProvidder>
        <Router>
          <Switch>
            <UnProtectedRoute path="/login" component={LoginContextWrapper} />
            <ProtectedRoute component={Dashboard} />
          </Switch>
        </Router>
      </AxiosProvidder>
    </AuthProvider>
  );
}

const LoginContextWrapper = () => (
  <LoginFormProvider>
    <Login />
  </LoginFormProvider>
);

export default App;
