import { Link, withRouter } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand mb-0 h1" to="/">
            InfySys
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {!isAuthenticated() && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/partner/register/">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signin">
                      Signin
                    </Link>
                  </li>
                </>
              )}

              {isAuthenticated() && (
                <li className="nav-item">
                  <Link to="/profile">
                    <button
                      style={{
                        borderRadius: "50%",
                        width: "35px",
                        height: "35px",
                        padding: "0",
                      }}
                      type="button"
                      className="btn btn-primary"
                    >
                      {isAuthenticated().user.name[0]}
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default withRouter(Navbar);
