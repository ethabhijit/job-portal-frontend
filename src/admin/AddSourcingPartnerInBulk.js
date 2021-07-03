import { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { API } from "../backend";
import { errorMessage, successMessage } from "../components/CustomAlert";
import Sidenav from "../components/Sidenav";
import Base from "../core/Base";
import { createSourcingPartnerInBulk } from "./helper/partnerapicalls";

const AddSourcingPartnerInBulk = () => {
  const [values, setValues] = useState({
    xlsxFile: "",
    error: "",
    loading: false,
    success: false,
    formData: new FormData(),
  });
  const { user, token } = isAuthenticated();

  const { formData, error, loading, success } = values;

  const handleChange = (name) => (event) => {
    formData.set(name, event.target.files[0]);
    setValues({ ...values, error: false, [name]: event.target.files[0] });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    createSourcingPartnerInBulk(user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            success: false,
            loading: false,
          });
        } else {
          setValues({
            ...values,
            error: "",
            xlsxFile: "",
            loading: false,
            success: true,
          });
        }
      })
      .catch(console.log("Error in bulk creation of channel partner"));
  };

  return (
    <Base>
      <div className="container mt-5 mb-3">
        <div className="row">
          <Sidenav />
          <div className="col-lg-6 col-md-8">
            {error && errorMessage(error)}
            {success && successMessage(success, "Channel partner uploaded!")}

            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-4">Add Sourcing Partners</h5>

                <div className="mb-3">
                  <label for="fileInput" className="form-label">
                    Upload xlsx file
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="fileInput"
                    onChange={handleChange("xlsxFile")}
                  />
                </div>

                <div className="row  mt-3 mb-3">
                  <div className="d-grid gap-2 d-md-flex ">
                    <div className="d-grid col-md-4 col-sm-12">
                      <button
                        className="btn btn-primary mt-1"
                        type="button"
                        onClick={onSubmit}
                        disabled={loading}
                      >
                        Add
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

                    <a
                      className="btn btn-secondary mt-1"
                      href={`${API}/template/bulk_upload_channel_partner`}
                    >
                      Download Template
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <p>{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default AddSourcingPartnerInBulk;
