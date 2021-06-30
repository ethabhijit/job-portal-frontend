import { useState } from "react";
import Base from "../core/Base";

const AddCandidate = () => {
  const [inputCount, setInputCount] = useState(1);

  return (
    <Base>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-7 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-4">
                  Add Candidates Manually
                  <span style={{ float: "right" }}>
                    <div className="btn-group" role="group">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setInputCount(inputCount + 1)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setInputCount(inputCount - 1)}
                      >
                        -
                      </button>
                    </div>
                  </span>
                </h5>

                {Array(inputCount)
                  .fill(0)
                  .map((elem, index) => (
                    <div className="input-group mt-3" key={index}>
                      <span className="input-group-text">Name</span>
                      <input type="text" className="form-control" />
                      <span className="input-group-text">Email</span>
                      <input type="text" className="form-control" />
                      <span className="input-group-text">Phone</span>
                      <input type="text" className="form-control" />
                    </div>
                  ))}
                <button className="btn btn-primary mt-3">Submit</button>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Add Candidates Automatically</h5>

                <div className="mb-3">
                  <label for="formFile" className="form-label">
                    Upload a xlsx file
                  </label>
                  <input className="form-control" type="file" id="formFile" />
                  <button className="btn btn-primary mt-3">Upload</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default AddCandidate;
