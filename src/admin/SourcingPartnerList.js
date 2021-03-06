import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { errorMessage } from "../components/CustomAlert";
import Sidenav from "../components/Sidenav";
import Base from "../core/Base";
import { deletePartner, getAllSourcingPartners } from "./helper/partnerapicalls";

const SourcingPartnerList = () => {
  const [partners, setPartners] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, token } = isAuthenticated();

  useEffect(() => {
    preload(user._id, token);
  }, []);

  const preload = (id, atoken) => {
    setLoading(true);
    getAllSourcingPartners(id, atoken)
      .then((data) => {
        if (data?.error) {
          setError(data.error);
          setLoading(false);
        } else {
          setPartners(data);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const deletePartnerById = (adminId, token, partnerId) => {
    setLoading(true);
    deletePartner(adminId, token, partnerId)
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
        <p className="h4 text-center m-3">Sourcing Partner Lists </p>

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

            <div
              className="table-responsive"
              style={{ height: "400px", overflowY: "scroll" }}
            >
              <table className="table table-light table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Created</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {partners &&
                    partners.map((partner, index) => (
                      <tr key={partner._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{`S0000${index + 1}`}</td>
                        <td>{partner.name}</td>
                        <td>{partner.email}</td>
                        <td>{partner.phone}</td>
                        <td>
                          {moment(partner.createdAt).format("DD/MM/YYYY")}
                        </td>
                        <td>
                          <div className="d-grid gap-2 d-md-flex">
                            <Link
                              className="btn btn-secondary btn-sm"
                              to={`/update/partner/` + partner._id}
                            >
                              Update
                            </Link>
                            <button
                              className="btn btn-danger btn-sm"
                              type="button"
                              onClick={() =>
                                deletePartnerById(user._id, token, partner._id)
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

export default SourcingPartnerList;
