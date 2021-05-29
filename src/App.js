import Login from "./Views/Login";
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Dashboard from "./Views/Dashboard";
import ProtectedRoute from "./Components/Routes/ProtectedRoute";
import UnProtectedRoute from "./Components/Routes/UnProtectedRoute";

function App() {
  return (
    <Router>
      <Switch>
        <UnProtectedRoute path="/login" component={Login} />
        <ProtectedRoute component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
