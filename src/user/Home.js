import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import CustomCarousel from "../components/CustomCarousel";

const Home = () => {
  const performRedirect = () => {
    if (isAuthenticated()) {
      return <Redirect to="/dashboard" />;
    }
  };

  return (
    <Base>
      {performRedirect()}
      <div className="card bg-light">
        <div className="card-body pt-5">
          <div className="row">
            <div className="col-md-4 mb-5">
              <p className="h2">InfySys Job Protal</p>
              <p>Job Protal for job seekers!</p>
              <div className="d-grid gap-2 d-md-flex mt-4">
                <Link to="/signin" className="btn btn-primary">
                  Login
                </Link>
                <Link to="/partner/register" className="btn btn btn-secondary">
                  Register
                </Link>
              </div>
            </div>

            <div className="col-md-8">
            <CustomCarousel />
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Home;
