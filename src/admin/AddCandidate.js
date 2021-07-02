import { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { successMessage, errorMessage } from "../components/CustomAlert";
import Sidenav from "../components/Sidenav";
import Base from "../core/Base";
import {
  createCandidate,
  createCandidateForBulk,
} from "./helper/candidateapicalls";

const AddCandidate = () => {
  const inputTemplate = {
    skill: "",
    email: "",
    phone: "",
    cv: "",
    formData: new FormData(),
  };
  const [inputFields, setInputFields] = useState([inputTemplate]);
  const [inputFieldsForBulk, setInputFieldsForBulk] = useState({
    xlsxFile: "",
    zipFile: "",
    errorForBulk: "",
    loadingForBulk: false,
    successForBulk: false,
    formData: new FormData(),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push(inputTemplate);
    setInputFields(values);
  };

  const handleRemoveFields = () => {
    const values = [...inputFields];
    values.splice(values.length - 1, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, event, key) => {
    const values = [...inputFields];
    const val = key === "cv" ? event.target.files[0] : event.target.value;

    values[index][key] = val;
    values[index].formData.set(key, val);

    setInputFields(values);
  };

  //for add candidate through xlsx and zip file
  const handleChangeForBulk = (name) => (event) => {
    const value = event.target.files[0];
    inputFieldsForBulk.formData.set(name, value);
    setInputFieldsForBulk({ ...inputFieldsForBulk, [name]: value });
  };

  const onSubmitForBulk = (e) => {
    e.preventDefault();
    setInputFieldsForBulk({
      ...inputFieldsForBulk,
      errorForBulk: "",
      loadingForBulk: true,
    });
    console.log("inputFields", inputFieldsForBulk);
    createCandidateForBulk(user._id, token, inputFieldsForBulk.formData)
      .then((data) => {
        if (data?.error) {
          setInputFieldsForBulk({
            ...inputFieldsForBulk,
            errorForBulk: data.error,
            loadingForBulk: false,
            successForBulk: false,
          });
        } else {
          setInputFieldsForBulk({
            ...inputFieldsForBulk,
            errorForBulk: "",
            loadingForBulk: false,
            successForBulk: true,
          });
        }
      })
      .catch(console.log("Not able to upload candidates"));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCandidate(user._id, token, inputFields)
      .then((data) => {
        if (data?.error) {
          setError(data.error);
          setSuccess(false);
          setLoading(false);
        } else {
          setError("");
          setSuccess(true);
          setLoading(false);
        }
      })
      .catch(console.log("Not able to upload candidates"));
  };

  return (
    <Base>
      <div className="container mt-5">
        <div className="row">
          <Sidenav />

          <div className="col-lg-9 col-md-8">
            <div className="row justify-content-center">
              <div className="col-md-12 mb-3">
                <div
                  className="card bg-light"
                  style={{ height: "330px", overflowY: "scroll" }}
                >
                  <div className="card-body">
                    <h5 className="card-title mb-4">
                      Add Candidates Manually
                      <span style={{ float: "right" }}>
                        <div className="btn-group" role="group">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleAddFields()}
                          >
                            +
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleRemoveFields()}
                          >
                            -
                          </button>
                        </div>
                      </span>
                    </h5>
                    {successMessage(success, "Added successfully")}
                    {errorMessage(error)}

                    {inputFields.map((inputField, index) => (
                      <div
                        className="input-group mt-3"
                        key={`${inputField}~${index}`}
                      >
                        <span className="input-group-text">Skill</span>
                        <input
                          type="text"
                          className="form-control"
                          name="skill"
                          value={inputField.skill}
                          onChange={(event) =>
                            handleInputChange(index, event, "skill")
                          }
                        />
                        <span className="input-group-text">Email</span>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={inputField.email}
                          onChange={(event) =>
                            handleInputChange(index, event, "email")
                          }
                        />
                        <span className="input-group-text">Phone</span>
                        <input
                          type="text"
                          className="form-control"
                          value={inputField.phone}
                          onChange={(event) =>
                            handleInputChange(index, event, "phone")
                          }
                        />
                        <input
                          type="file"
                          className="form-control"
                          name="cv"
                          value={inputField.file}
                          onChange={(event) =>
                            handleInputChange(index, event, "cv")
                          }
                        />
                      </div>
                    ))}
                    {/* <div className="mt-3 mb-3">
                      <label htmlFor="formFile" className="form-label">
                        Upload a zip file
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="formFile"
                      />
                    </div> */}
                    <div className="d-grid gap-2 col-3">
                      <button
                        className="btn btn-primary mt-3"
                        onClick={onSubmit}
                        disabled={loading}
                      >
                        Submit
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

              <div className="col-md-12 mb-3">
                <div className="card bg-light">
                  <div className="card-body">
                    <h5 className="card-title">Add Candidates Automatically</h5>

                    {successMessage(
                      inputFieldsForBulk.successForBulk,
                      "Added successfully"
                    )}
                    {errorMessage(inputFieldsForBulk.errorForBulk)}

                    <div className="mb-3">
                      <label htmlFor="formFile" className="form-label">
                        Upload a xlsx file
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="formFile"
                        name="xlsxFile"
                        onChange={handleChangeForBulk("xlsxFile")}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="formFile" className="form-label">
                        Upload a zip file
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="formFile"
                        name="zipFile"
                        onChange={handleChangeForBulk("zipFile")}
                      />
                    </div>
                    <div className="d-grid gap-2 col-3">
                      <button
                        className="btn btn-primary mt-3"
                        onClick={onSubmitForBulk}
                        disabled={inputFieldsForBulk.loadingForBulk}
                      >
                        Submit
                        {inputFieldsForBulk.loadingForBulk && (
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
        </div>
      </div>
    </Base>
  );
};

export default AddCandidate;
