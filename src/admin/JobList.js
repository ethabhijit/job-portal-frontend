import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { errorMessage } from "../components/CustomAlert";
import Sidenav from "../components/Sidenav";
import Base from "../core/Base";
import { deleteJob, getAllJobs } from "./helper/adminapicalls";

const JobList = () => {
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

  const deleteJobById = (adminId, token, jobId) => {
    setLoading(true);
    deleteJob(adminId, token, jobId)
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setLoading(false);
        } else {
          preload(user._id, token);
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Base>
      <div className="container">
        <p className="h4 text-center m-3">Job Lists</p>
        <div className="row">
          <Sidenav />
          <div className="col-lg-9 col-md-8">
            {error && errorMessage(error)}
            {loading && (
              <div
                className="spinner-border spinner-border-sm text-primary"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            )}

            <div
              className="table-responsive"
              style={{ height: "400px", overflowY: "scroll" }}
            >
              <table className="table table-light table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Job Title</th>
                    <th scope="col">Skill</th>
                    <th scope="col">No. Employee</th>
                    <th scope="col">Created</th>
                    <th scope="col">Updated</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs &&
                    jobs.map((job, index) => (
                      <tr key={job._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{job.title}</td>
                        <td>{job.skill}</td>
                        <td>{job.noOfEmp}</td>
                        <td>{moment(job.createdAt).format("DD/MM/YYYY")}</td>
                        <td>{moment(job.updatedAt).format("DD/MM/YYYY")}</td>
                        <td>
                          <div className="d-grid gap-2 d-md-flex">
                            <Link
                              className="btn btn-secondary btn-sm"
                              to={`/update/job/` + job._id}
                            >
                              Update
                            </Link>
                            <button
                              className="btn btn-danger btn-sm"
                              type="button"
                              onClick={() =>
                                deleteJobById(user._id, token, job._id)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default JobList;
