import moment from "moment";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { isAuthenticated, signout } from "../auth/helper";
import Sidenav from "../components/Sidenav";

const Profile = ({ history }) => {
  const { user } = isAuthenticated();

  return (
    <Base>
      <div className="row justify-content-center mt-5">
        <Sidenav />
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Profile</h5>
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{user.name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <td>Last Login</td>
                    <td>{moment(user.lastLogin).format("DD/MM/YYYY hh:mm A")}</td>
                  </tr>
                  <tr>
                    <td>Type</td>
                    {user.role === 0 && (
                      <td>
                        <span className="badge rounded-pill bg-primary">
                          user
                        </span>
                      </td>
                    )}
                    {user.role === 1 && (
                      <td>
                        <span className="badge rounded-pill bg-primary">
                          admin
                        </span>
                      </td>
                    )}
                    {user.role === 2 && (
                      <td>
                        <span className="badge rounded-pill bg-primary">
                          partner
                        </span>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
              <div className="d-grid gap-2 d-md-flex">
                {isAuthenticated() && (
                  <Link className="btn btn-primary" to="/dashboard">
                    Go to dashboard
                  </Link>
                )}
                {isAuthenticated() && (
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      signout(() => {
                        history.push("/");
                      });
                    }}
                  >
                    Signout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Profile;
