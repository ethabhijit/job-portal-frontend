import { isAuthenticated, signout } from "../auth/helper";
import Base from "../core/Base";

const Dashboard = ({ history }) => {
  const { user } = isAuthenticated();

  return (
    <Base>
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 class="card-title">Dashboard</h5>
              <table class="table table-hover">
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
                    <td>Type</td>
                    {user.role === 0 && (
                      <td>
                        <span class="badge rounded-pill bg-primary">user</span>
                      </td>
                    )}
                    {user.role === 1 && (
                      <td>
                        <span class="badge rounded-pill bg-primary">admin</span>
                      </td>
                    )}
                    {user.role === 2 && (
                      <td>
                        <span class="badge rounded-pill bg-primary">partner</span>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
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
    </Base>
  );
};

export default Dashboard;
