import moment from "moment";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { API } from "../backend";
import { errorMessage } from "../components/CustomAlert";
import Sidenav from "../components/Sidenav";
import Base from "../core/Base";
import { getAllCandidates, deleteCandidate } from "./helper/candidateapicalls";

const CandidateList = () => {
  const [candidates, setCandidate] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, token } = isAuthenticated();

  useEffect(() => {
    preload(user._id, token);
  }, []);

  const preload = (id, atoken) => {
    setLoading(true);
    getAllCandidates(id, atoken)
      .then((data) => {
        if (data?.error) {
          setError(data.error);
          setLoading(false);
        } else {
          setCandidate(data);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteCandidateById = (adminId, token, candidateId) => {
    setLoading(true);
    deleteCandidate(adminId, token, candidateId)
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
        <p className="h4 text-center m-3">Candidate Lists</p>
        <div className="row">
          <Sidenav />

          <div className="col-lg-9 col-md-8">
            {/* Alert Message */}
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
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Created</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates &&
                    candidates.map((candidate, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{candidate.email}</td>
                        <td>{candidate.phone}</td>
                        <td>
                          {moment(candidate.createdAt).format("DD/MM/YYYY")}
                        </td>
                        <td>
                          <div className="d-grid gap-2 d-md-flex">
                            <a
                              href={`${API}/candidate/cv/${candidate._id}`}
                              className="btn btn-secondary btn-sm"
                            >
                              Download PDF
                            </a>
                            <button
                              className="btn btn-danger btn-sm"
                              type="button"
                              onClick={() =>
                                deleteCandidateById(
                                  user._id,
                                  token,
                                  candidate._id
                                )
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

export default CandidateList;
