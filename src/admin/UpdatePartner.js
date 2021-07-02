import { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { errorMessage, successMessage } from "../components/CustomAlert";
import Sidenav from "../components/Sidenav";
import Base from "../core/Base";
import { getAPartner, updatePartner } from "./helper/partnerapicalls";

const UpdatePartner = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    role: 0,
    password: "",
    error: "",
    loading: false,
    success: false,
  });
  const { user, token } = isAuthenticated();

  const { name, email, role, phone, password, error, loading, success } =
    values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    updatePartner(user._id, token, match.params.partnerId, {
      name,
      email,
      role,
      phone,
      password,
    })
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
            name: "",
            email: "",
            phone: "",
            role: 0,
            password: "",
            error: "",
            success: true,
            loading: false,
          });
        }
      })
      .catch(console.log("Error in creation of subadmin"));
  };

  const preload = (adminId, token, jobId) => {
    getAPartner(adminId, token, jobId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          email: data.email,
          phone: data.phone,
          role: data.role,
        });
      }
    });
  };

  useEffect(() => {
    preload(user._id, token, match.params.partnerId);
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
                {success &&
                  successMessage(success, "Partner Updated Successfully!")}
                {error && errorMessage(error)}

                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title mb-4">Update Partner</h5>

                    <div className="mb-3">
                      <label for="nameInput" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nameInput"
                        onChange={handleChange("name")}
                        value={name}
                      />
                    </div>

                    <div className="mb-3">
                      <label for="emailInput" className="form-label">
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="emailInput"
                        onChange={handleChange("email")}
                        value={email}
                      />
                    </div>

                    <div className="mb-3">
                      <label for="phoneInput" className="form-label">
                        Mobile
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phoneInput"
                        onChange={handleChange("phone")}
                        value={phone}
                      />
                    </div>

                    <div className="mb-3">
                      <label for="passwordInput" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="passwordInput"
                        onChange={handleChange("password")}
                        value={password}
                      />
                    </div>

                    <div className="d-flex justify-content-center mb-2">
                      {["user", "partner"].map((item, index) => (
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="role"
                            value={item === "user" ? 0 : 2}
                            onChange={handleChange("role")}
                            id={item}
                          />
                          <label className="form-check-label" htmlFor={item}>
                            {item.capitalize()}
                          </label>
                        </div>
                      ))}
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

export default UpdatePartner;
