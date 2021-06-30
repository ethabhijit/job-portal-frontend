import Base from "../core/Base";
import Sidenav from "../components/Sidenav";

const Dashboard = () => {

  return (
    <Base>
      <div className="row justify-content-center mt-5">
        <Sidenav />
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Dashboard</h5>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Dashboard;
