import Base from "../core/Base";
import Sidenav from "../components/Sidenav";

const Dashboard = () => {
  return (
    <Base>
      <div className="row justify-content-center mt-5">
        <Sidenav />
        <div className="col-md-6">
          <div className="card ">
            <div className="card-body bg-light">
              <h4 className="card-title">Jobs</h4>
              <ul
                className="list-group"
                style={{ height: "400px", overflowY: "scroll" }}
              >
                {Array(20)
                  .fill(0)
                  .map((elem, index) => (
                    <li
                      className="list-group-item mt-3"
                      key={index}
                      style={{ borderTopWidth: "1px", borderRadius: "5px" }}
                    >
                      <p className="h6">React JS Developer</p>
                      <p>Hyderabad, Telangana</p>
                      <div className="d-grid gap-2 d-md-flex">
                        <span className="badge bg-danger">Hot</span>
                        <span className="badge bg-success">Urgent</span>
                      </div>

                      <p className="mt-3">
                        We are looking for a skilled React.js Developer to join
                        Pushpak’s Front-End development team. In this role, you
                        will be responsible for developing and implementing user
                        interface components using React.js concepts and
                        workflows such as Redux, Flux, and Webpack.
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Dashboard;
