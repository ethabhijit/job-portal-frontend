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
    error: "",
    loading: false,
    success: false,
  });

  const { name, email, role, phone, password, error, loading, success } =
    values;

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
    signup({ name, email, role, phone, password })
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
      <div className="container mt-5">
        <div className="row justify-content-center">
          {successMessage()}
          {errorMessage()}
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4 col-sm-6 card p-3">
            <p className="h4 text-center mt-3 mb-3">Register</p>
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

            <button
              className="btn btn-primary mb-3"
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
