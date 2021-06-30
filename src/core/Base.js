import Navbar from "../components/Navbar";

const Base = ({ title, children }) => {
  const footerCss = {
    width: "100%",
    position: "absolute",
    bottom: "0",
    left: "0",
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid	">
        <div className="row">{children}</div>
        <div style={footerCss}>
          <p class="text-center">Copyright © 2021 - InfySys</p>
        </div>
      </div>
    </>
  );
};

export default Base;
