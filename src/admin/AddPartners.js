import { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import { errorMessage } from "../components/CustomAlert";
import Sidenav from "../components/Sidenav";
import Base from "../core/Base";

const AddPartners = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    role: 2,
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

  //String capitalize function
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  //Form validation client side
  const validateForm = (obj) => {
    const allLetters = /^[a-zA-Z]+$/;
    const specialCharacters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const letter = /[a-zA-Z]/;
    const number = /[0-9]/;
    const mobileNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    const url =
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

    const invalid = [];

    if (!allLetters.test(obj.name)) {
      invalid.push("*Name");
    }

    if (!mobileNumber.test(obj.phone)) {
      invalid.push("*Phone");
    }

    if (!url.test(obj.website)) {
      invalid.push("*Website");
    }

    if (
      obj.email.indexOf("@") < 1 ||
      obj.email.lastIndexOf(".") < email.indexOf("@") + 2 ||
      obj.email.lastIndexOf(".") + 2 >= email.length
    ) {
      invalid.push("*Email");
    }

    if (
      obj.password.length < 8 ||
      !letter.test(password) ||
      !number.test(password) ||
      !specialCharacters.test(password)
    ) {
      invalid.push("*Password");
    }

    if (invalid.length != 0) {
      const message = `Please fill the ${invalid.join(", ")} properly!`;
      setValues({ ...values, error: message });
      return false;
    }

    return true;
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (
      validateForm({
        name,
        email,
        phone,
        password,
        website,
      })
    ) {
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
    } else {
      return;
    }
  };

  return (
    <Base>
      <div className="container mt-5 mb-3">
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

            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-4">Add Channel Partners</h5>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label for="nameInput" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
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
                        className="form-control form-control-sm"
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
                        className="form-control form-control-sm"
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
                        className="form-control form-control-sm"
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
                        className="form-control form-control-sm"
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
                        className="form-control form-control-sm"
                        id="websiteInput"
                        onChange={handleChange("website")}
                        value={website}
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        for="contactPerson1EmailInput"
                        className="form-label"
                      >
                        Contact Person 1 Email
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="contactPerson1EmailInput"
                        onChange={handleChange("contactPerson1Email")}
                        value={contactPerson1Email}
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        for="contactPerson1PhoneInput"
                        className="form-label"
                      >
                        Contact Person 1 Phone
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="contactPerson1PhoneInput"
                        onChange={handleChange("contactPerson1Phone")}
                        value={contactPerson1Phone}
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        for="contactPerson2EmailInput"
                        className="form-label"
                      >
                        Contact Person 2 Email
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="contactPerson2EmailInput"
                        onChange={handleChange("contactPerson2Email")}
                        value={contactPerson2Email}
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        for="contactPerson2PhoneInput"
                        className="form-label"
                      >
                        Contact Person 2 Phone
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="contactPerson2PhoneInput"
                        onChange={handleChange("contactPerson2Phone")}
                        value={contactPerson2Phone}
                      />
                    </div>
                  </div>
                </div>

                <div className="row  mt-3 mb-3">
                  <div className="d-grid gap-2 d-md-flex ">
                    <div className="d-grid col-md-2 col-sm-12">
                      <button
                        className="btn btn-primary btn-sm mt-1"
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

                    <Link
                      className="btn btn-secondary btn-sm mt-1"
                      to="/add/channel-partner/bulk"
                    >
                      Add with xlsx file
                    </Link>
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

export default AddPartners;
