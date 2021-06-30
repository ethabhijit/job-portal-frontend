import { useState } from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              loading: false,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("signin request failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/dashboard" />;
    }
    if (isAuthenticated()) {
      return <Redirect to="/dashboard" />;
    }
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
        <div className="row justify-content-center">{errorMessage()}</div>
        <div className="row justify-content-center">
          <div className="col-md-4 col-sm-6 card p-3">
            <p className="h4 text-center mt-3 mb-3">Signin</p>
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
      {performRedirect()}
      {/* <p className="text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signin;
