import moment from "moment";
import Base from "../core/Base";

const JobList = () => {
  return (
    <Base>
      <div className="container">
        <p className="h4 text-center m-3">Job Lists</p>

        <div className="table-responsive" style={{ height: "400px", overflowY: "scroll" }}>
          <table className="table table-light table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Job Description</th>
                <th scope="col">Created</th>
                <th scope="col">Updated</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array(20)
                .fill(0)
                .map((elem, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>Need java developer</td>
                    <td>{moment().format('DD/MM/YYYY, h:mm A')}</td>
                    <td>{moment().format('DD/MM/YYYY, h:mm A')}</td>
                    <td>
                      <div className="d-grid gap-2 d-md-flex">
                        <button
                          className="btn btn-secondary btn-sm"
                          type="button"
                        >
                          Edit
                        </button>
                        <button className="btn btn-danger btn-sm" type="button">
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
    </Base>
  );
};

export default JobList;
