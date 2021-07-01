import { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { errorMessage, successMessage } from "../components/CustomAlert";
import Sidenav from "../components/Sidenav";
import Base from "../core/Base";
import { updateJob, getAJob } from "./helper/adminapicalls";

const UpdateJob = ({ match }) => {
  const [values, setValues] = useState({
    title: "",
    noOfEmp: 0,
    skill: "",
    error: "",
    loading: false,
    success: false,
  });
  const { user, token } = isAuthenticated();

  const { title, skill, noOfEmp, error, loading, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    updateJob(user._id, token, match.params.jobId, { title, skill, noOfEmp })
      .then((data) => {
        if (data?.error) {
          setValues({
            ...values,
            error: data.error,
            success: false,
            loading: false,
          });
        } else {
          setValues({
            ...values,
            title: "",
            noOfEmp: 0,
            skill: "",
            error: "",
            success: true,
            loading: false,
          });
        }
      })
      .catch(console.log("Error in creation of subadmin"));
  };

  const preload = (adminId, token, jobId) => {
    getAJob(adminId, token, jobId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: data.title,
          noOfEmp: data.noOfEmp,
          skill: data.skill,
        });
      }
    });
  };

  useEffect(() => {
    preload(user._id, token, match.params.jobId);
  }, []);

  return (
    <Base>
      <div className="container mt-5">
        <div className="row">
          <Sidenav />

          <div className="col-lg-9 col-md-8">
            <div className="row jusfify-content-flex-start">
              <div className="col-md-6">
                {/* Alert Message */}
                {success && successMessage(success, "Job Updated Successfully!")}
                {error && errorMessage(error)}

                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title mb-4">Update Job</h5>

                    <div class="mb-3">
                      <label htmlFor="titleInput" class="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="titleInput"
                        value={title}
                        onChange={handleChange("title")}
                      />
                    </div>

                    <div class="mb-3">
                      <label htmlFor="noOfEmpolyeInput" class="form-label">
                        Number of employe required
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="noOfEmpolyeInput"
                        value={noOfEmp}
                        onChange={handleChange("noOfEmp")}
                      />
                    </div>

                    <div class="mb-3">
                      <label htmlFor="skillInput" class="form-label">
                        Skill
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="skillInput"
                        value={skill}
                        onChange={handleChange("skill")}
                      />
                    </div>

                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-primary mt-3"
                        onClick={onSubmit}
                        disabled={loading}
                      >
                        Update
                        {loading && (
                          <div
                            className="spinner-grow spinner-grow-sm ms-2"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <p>{JSON.stringify(values)}</p> */}
        </div>
      </div>
    </Base>
  );
};

export default UpdateJob;
