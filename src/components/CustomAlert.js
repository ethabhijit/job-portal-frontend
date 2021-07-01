export const successMessage = (success, message) => {
  return (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      {message}
    </div>
  );
};

export const errorMessage = (error) => {
  return (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
};
