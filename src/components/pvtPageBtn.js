import React from "react";
import { Link } from "react-router-dom";

function HomeBtn() {
  return (
    <Link to="/privatePage">
      <button className="btn btn-primary">Private page</button>
    </Link>
  );
}

export default HomeBtn;
