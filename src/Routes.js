import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddCandidate from "./admin/AddCandidate";
import AddChannelPartnerInBulk from "./admin/AddChannelPartnerInBulk";
import AddJob from "./admin/AddJob";
import AddPartners from "./admin/AddPartners";
import AddSourcingPartner from "./admin/AddSourcingPartner";
import AddSourcingPartnerInBulk from "./admin/AddSourcingPartnerInBulk";
import CandidateList from "./admin/CandidateList";
import JobList from "./admin/JobList";
import PartnerList from "./admin/PartnerList";
import SourcingPartnerList from "./admin/SourcingPartnerList";
import UpdateJob from "./admin/UpdateJob";
import UpdatePartner from "./admin/UpdatePartner";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import Dashboard from "./user/Dashboard";
import Home from "./user/Home";
import PartnerSignup from "./user/PartnerSignup";
import Profile from "./user/Profile";
import Signin from "./user/Signin";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/partner/register/" exact component={PartnerSignup} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/add/candidate" component={AddCandidate} />
        <AdminRoute path="/job/lists" component={JobList} />
        <AdminRoute path="/partner/lists" component={PartnerList} />
        <AdminRoute path="/add/partner" component={AddPartners} />
        <AdminRoute path="/add/channel-partner/bulk" component={AddChannelPartnerInBulk} />
        <AdminRoute path="/sourcing-partner/lists" component={SourcingPartnerList} />
        <AdminRoute path="/add/sourcing-partner" component={AddSourcingPartner} />
        <AdminRoute path="/sourcing-partner/bulk/add" component={AddSourcingPartnerInBulk} />
        <AdminRoute path="/candidate/lists" component={CandidateList} />
        <AdminRoute path="/add/job" component={AddJob} />
        <AdminRoute path="/update/job/:jobId" component={UpdateJob} />
        <AdminRoute path="/update/partner/:partnerId" component={UpdatePartner} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
