import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

const Sidenav = () => {
  const { user } = isAuthenticated();

  return (
    <div className="col-lg-3 col-md-4 col-sm-12 mb-3">
      <ul className="list-group">
        <Link
          className="list-group-item list-group-item-action"
          to="/dashboard"
        >
          Dashboard
        </Link>
        {isAuthenticated() && (
          <Link
            className="list-group-item list-group-item-action"
            to="/profile"
          >
            Profile
          </Link>
        )}

        {isAuthenticated() && user.role === 1 && (
          <>
            <Link
              className="list-group-item list-group-item-action"
              to="/job/lists"
            >
              Job Lists
            </Link>
            <Link
              className="list-group-item list-group-item-action"
              to="/add/job"
            >
              Add Job
            </Link>
            <Link
              className="list-group-item list-group-item-action"
              to="/partner/lists"
            >
              Channel Partner Lists
            </Link>
            <Link
              className="list-group-item list-group-item-action"
              to="/add/partner"
            >
              Add  Channel Partners
            </Link>
            <Link
              className="list-group-item list-group-item-action"
              to="/sourcing-partner/lists"
            >
              Sourcing Partner Lists
            </Link>
            <Link
              className="list-group-item list-group-item-action"
              to="/add/sourcing-partner"
            >
              Add Sourcing Partners
            </Link>
            <Link
              className="list-group-item list-group-item-action"
              to="/candidate/lists"
            >
              Candidate Lists
            </Link>
          </>
        )}
        {isAuthenticated() && user.role === 1 && (
          <Link
            className="list-group-item list-group-item-action"
            to="/add/candidate"
          >
            Add Candidates
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Sidenav;
