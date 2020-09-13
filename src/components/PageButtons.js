import React from "react";
import Button from "react-bootstrap/Button";

const PageButtons = ({ handleClick }) => {
  return (
    <div className="pagebuttons">
      <Button
        className="pagebutton"
        variant="outline-dark"
        size="sm"
        id="previous"
        onClick={handleClick}
      >
        Previous
      </Button>
      <Button
        className="pagebutton"
        variant="outline-dark"
        size="sm"
        id="next"
        onClick={handleClick}
      >
        Next
      </Button>
    </div>
  );
};

export default PageButtons;
