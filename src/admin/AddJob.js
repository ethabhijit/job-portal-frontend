import { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { errorMessage, successMessage } from "../components/CustomAlert";
import Sidenav from "../components/Sidenav";
import Base from "../core/Base";
import { createJob } from "./helper/adminapicalls";

const AddJob = () => {
  const [values, setValues] = useState({
    title: "",
    noOfEmp: 0,
    skill: "",
    durationOfContract: "",
    sourcingPartner: "",
    isRemoteJob: false,
    companyType: [],
    experience: [],
    jobType: [],
    location: "",
    remarks: "",
    domain: "",
    refJd: "",
    diversityPreferrence: "",
    minEducation: "",
    maxSalary: "",
    expectedDoj: "",
    error: "",
    loading: false,
    success: false,
    formData: new FormData(),
  });
  const { user, token } = isAuthenticated();

  const {
    title,
    skill,
    noOfEmp,
    durationOfContract,
    remarks,
    domain,
    diversityPreferrence,
    location,
    companyType,
    jobType,
    experience,
    sourcingPartner,
    minEducation,
    formData,
    maxSalary,
    expectedDoj,
    error,
    loading,
    success,
  } = values;

  const handleChange = (name) => (event) => {
    const value = name === "refJd" ? event.target.files[0] : event.target.value;
    formData.set(name, value);

    if (name === "companyType") {
      if (event.target.checked) {
        setValues({ ...values, error: false, [name]: [...companyType, value] });
      } else {
        companyType.splice(companyType.indexOf(value), 1);
        setValues({ ...values, error: false, [name]: [...companyType] });
      }
    } else if (name === "experience") {
      if (event.target.checked) {
        setValues({ ...values, error: false, [name]: [...experience, value] });
      } else {
        experience.splice(experience.indexOf(value), 1);
        setValues({ ...values, error: false, [name]: [...experience] });
      }
    } else if (name === "jobType") {
      if (event.target.checked) {
        setValues({ ...values, error: false, [name]: [...jobType, value] });
      } else {
        jobType.splice(jobType.indexOf(value), 1);
        setValues({ ...values, error: false, [name]: [...jobType] });
      }
    } else {
      setValues({ ...values, error: false, [name]: value });
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    formData.set("companyType", companyType);
    formData.set("experience", experience);
    formData.set("jobType", jobType);

    createJob(user._id, token, formData)
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
            durationOfContract: "",
            remarks: "",
            refJd: "",
            domain: "",
            isRemoteJob: false,
            companyType: [],
            jobType: [],
            experience: [],
            location: "",
            diversityPreferrence: "",
            minEducation: "",
            maxSalary: "",
            expectedDoj: "",
            error: "",
            success: true,
            loading: false,
          });
        }
      })
      .catch(console.log("Error in creation of subadmin"));
  };

  return (
    <Base>
      <div className="container mt-5 mb-3">
        <div className="row">
          <Sidenav />

          <div className="col-lg-9 col-md-8">
            <div className="row jusfify-content-flex-start">
              <div className="col-md-12">
                {/* Alert Message */}
                {success && successMessage(success, "Job Added Successfully!")}
                {error && errorMessage(error)}

                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title mb-4">Add Job</h5>

                    <div className="row">
                      <div className="col-md-6">
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

                        <div class="mb-3">
                          <label
                            htmlFor="durationOfContractInput"
                            class="form-label"
                          >
                            Duration Of Contract
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="durationOfContractInput"
                            value={durationOfContract}
                            onChange={handleChange("durationOfContract")}
                          />
                        </div>

                        <div class="mb-3">
                          <label htmlFor="remarksInput" class="form-label">
                            Remarks
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="remarksInput"
                            value={remarks}
                            onChange={handleChange("remarks")}
                          />
                        </div>

                        <div class="mb-3">
                          <label htmlFor="domainInput" class="form-label">
                            Domain
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="domainInput"
                            value={domain}
                            onChange={handleChange("domain")}
                          />
                        </div>

                        <div className="mb-3">
                          <label class="form-label">Company Type</label>
                          <div>
                            {["Product", "Service", "BPO"].map(
                              (item, index) => (
                                <div class="form-check form-check-inline">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value={item}
                                    onChange={handleChange("companyType")}
                                    id={item}
                                  />
                                  <label
                                    class="form-check-label"
                                    htmlFor={item}
                                  >
                                    {item}
                                  </label>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        <div class="mb-3">
                          <label
                            htmlFor="diversityPreferrenceInput"
                            class="form-label"
                          >
                            Diversity Preferrence
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="diversityPreferrenceInput"
                            value={diversityPreferrence}
                            onChange={handleChange("diversityPreferrence")}
                          />
                        </div>

                        <div class="mb-3">
                          <label htmlFor="expectedDojInput" class="form-label">
                            Date Of Joining
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="expectedDojInput"
                            value={expectedDoj}
                            onChange={handleChange("expectedDoj")}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div class="mb-3">
                          <label
                            htmlFor="sourcingPartnerInput"
                            class="form-label"
                          >
                            Sourcing Partner ID
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="sourcingPartnerInput"
                            value={sourcingPartner}
                            onChange={handleChange("sourcingPartner")}
                          />
                        </div>

                        <div class="mb-3">
                          <label htmlFor="locationInput" class="form-label">
                            Location
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="locationInput"
                            value={location}
                            onChange={handleChange("location")}
                          />
                        </div>

                        <div className="mb-3">
                          <label class="form-label">Experience Range</label>
                          <div>
                            {["0-1", "2-5", "6-10", "10-15", "16+"].map(
                              (item, index) => (
                                <div class="form-check form-check-inline">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value={item}
                                    onChange={handleChange("experience")}
                                    id={item}
                                  />
                                  <label
                                    class="form-check-label"
                                    htmlFor={item}
                                  >
                                    {`${item} years`}
                                  </label>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        <div className="mb-3">
                          <label class="form-label">Job Type</label>
                          <div>
                            {["Full Time", "Part Time"].map((item, index) => (
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  value={item}
                                  onChange={handleChange("jobType")}
                                  id={item}
                                />
                                <label
                                  class="form-check-label"
                                  htmlFor={item}
                                >
                                  {item}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div class="mb-3">
                          <label htmlFor="refJdInput" class="form-label">
                            Reference JD
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id="refJdInput"
                            name="refJd"
                            onChange={handleChange("refJd")}
                          />
                        </div>

                        <div class="mb-3">
                          <label htmlFor="minEducationInput" class="form-label">
                            Min Education
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="minEducationInput"
                            value={minEducation}
                            onChange={handleChange("minEducation")}
                          />
                        </div>

                        <div class="mb-3">
                          <label htmlFor="maxSalaryInput" class="form-label">
                            Max Salary
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="maxSalaryInput"
                            value={maxSalary}
                            onChange={handleChange("maxSalary")}
                          />
                        </div>

                        <div className="mb-3">
                          <label class="form-label">WFH/remote?</label>
                          <div>
                            {["Yes", "No"].map((item, index) => (
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  value={item === "Yes" ? true : false}
                                  onChange={handleChange("isRemoteJob")}
                                  name="isWorkFromHome"
                                  id={item}
                                />
                                <label class="form-check-label" htmlFor={item}>
                                  {item}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-grid col-3 gap-2">
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
            </div>
          </div>
          {/* <p>{JSON.stringify(values)}</p> */}
        </div>
      </div>
    </Base>
  );
};

export default AddJob;
