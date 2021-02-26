import React from "react";
import { Spinner } from "react-bootstrap";
const SpinnerCenter = () => {
  return (
    <Spinner
      style={{
        height: "50px",
        width: "50px",
        position: "absolute",
        left: "calc(50% + 25px)",
        marginLeft: "-50px",
        top: "50%",
        marginTop: "-50px",
      }}
      animation="border"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default SpinnerCenter;
