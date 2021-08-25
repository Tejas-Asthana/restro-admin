import React from "react";
import { Link } from "react-router-dom";

function HomeBtn() {
  return (
    <Link to="/">
      <button className="btn btn-primary">Home</button>
    </Link>
  );
}

export default HomeBtn;
