import { useEffect, useState } from "react";
import Base from "../core/Base";
import Sidenav from "../components/Sidenav";
import { getAllJobs } from "../admin/helper/adminapicalls";
import { isAuthenticated } from "../auth/helper";
import { errorMessage } from "../components/CustomAlert";
import { API } from "../backend";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, token } = isAuthenticated();

  useEffect(() => {
    preload(user._id, token);
  }, []);

  const preload = (id, atoken) => {
    setLoading(true);
    getAllJobs(id, atoken)
      .then((data) => {
        if (data?.error) {
          setError(data.error);
          setLoading(false);
        } else {
          setJobs(data);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Base>
      <div className="row justify-content-center mt-5">
        <Sidenav />
        <div className="col-md-6">
          <div className="card ">
            <div className="card-body bg-light">
              <h4 className="card-title">Jobs</h4>
              {error && errorMessage(error)}
              {loading && (
                <div
                  className="spinner-border spinner-border-sm text-primary"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
              <ul
                className="list-group"
                style={{ height: "450px", overflowY: "scroll" }}
              >
                {jobs &&
                  jobs.map((job, index) => (
                    <li
                      className="list-group-item mt-3"
                      key={job._id}
                      style={{ borderTopWidth: "1px", borderRadius: "5px" }}
                    >
                      <p className="h6">{job.title}</p>

                      <p>Skill: {job.skill}</p>
                      <p>{job.noOfEmp} employee required</p>
                      <a
                        href={`${API}/job/doc/view/${job._id}`}
                        className="btn btn-success btn-sm"
                      >
                        View Reference JD
                      </a>
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
