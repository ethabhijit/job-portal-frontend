import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import Dashboard from "./user/Dashboard";
import Home from "./user/Home";
import PartnerSignup from "./user/PartnerSignup";
import Signin from "./user/Signin";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/partner/register/" exact component={PartnerSignup} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
