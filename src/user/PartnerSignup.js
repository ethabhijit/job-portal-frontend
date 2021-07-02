import { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import Base from "../core/Base";

const PartnerSignup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    role: 0,
    password: "",
    location: "",
    website: "",
    contactPerson1Email: "",
    contactPerson2Email: "",
    contactPerson1Phone: "",
    contactPerson2Phone: "",
    error: "",
    loading: false,
    success: false,
  });

  const {
    name,
    email,
    role,
    phone,
    password,
    location,
    website,
    contactPerson1Email,
    contactPerson1Phone,
    contactPerson2Email,
    contactPerson2Phone,
    error,
    loading,
    success,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  // String capitalize function
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    const reqBody = {
      name,
      email,
      role,
      phone,
      password,
      location,
      website,
      contactPerson1: {
        email: contactPerson1Email,
        phone: contactPerson1Phone,
      },
      contactPerson2: {
        email: contactPerson2Email,
        phone: contactPerson2Phone,
      },
    };
    signup(reqBody)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            phone: "",
            role: 0,
            password: "",
            location: "",
            website: "",
            contactPerson1Email: "",
            contactPerson2Email: "",
            contactPerson1Phone: "",
            contactPerson2Phone: "",
            error: "",
            loading: false,
            success: true,
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  const successMessage = () => {
    return (
      <div
        className="col-md-4 col-sm-6 card alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        New account was created successfully. Please
        <Link to="/signin">Login Here</Link>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="col-md-4 col-sm-6 card alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="container mt-5 mb-3">
        <div className="row justify-content-center">
          {successMessage()}
          {errorMessage()}
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 card p-3">
            <p className="h4 text-center mt-3 mb-3">Register</p>

            <div className="row">
              <div className="col-md-6">
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

                <div className="mb-3">
                  <label for="locationInput" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="locationInput"
                    onChange={handleChange("location")}
                    value={location}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label for="websiteInput" className="form-label">
                    Website
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="websiteInput"
                    onChange={handleChange("website")}
                    value={website}
                  />
                </div>

                <div className="mb-3">
                  <label for="contactPerson1EmailInput" className="form-label">
                    Contact Person 1 Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="contactPerson1EmailInput"
                    onChange={handleChange("contactPerson1Email")}
                    value={contactPerson1Email}
                  />
                </div>

                <div className="mb-3">
                  <label for="contactPerson1PhoneInput" className="form-label">
                    Contact Person 1 Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="contactPerson1PhoneInput"
                    onChange={handleChange("contactPerson1Phone")}
                    value={contactPerson1Phone}
                  />
                </div>

                <div className="mb-3">
                  <label for="contactPerson2EmailInput" className="form-label">
                    Contact Person 2 Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="contactPerson2EmailInput"
                    onChange={handleChange("contactPerson2Email")}
                    value={contactPerson2Email}
                  />
                </div>

                <div className="mb-3">
                  <label for="contactPerson2PhoneInput" className="form-label">
                    Contact Person 2 Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="contactPerson2PhoneInput"
                    onChange={handleChange("contactPerson2Phone")}
                    value={contactPerson2Phone}
                  />
                </div>
              </div>

              <div className="col-md-12">
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
              </div>
            </div>

            <div className="row justify-content-center mt-3 mb-3">
              <div className="d-grid col-4 gap-2">
                <button
                  className="btn btn-primary"
                  type="button"
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
    );
  };

  return (
    <Base>
      {signInForm()}
      {/* <p className="text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default PartnerSignup;
