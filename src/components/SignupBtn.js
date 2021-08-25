import React from "react";
import { Link } from "react-router-dom";

function SigninBtn() {
  return (
    <Link to="/signup">
      <button className="btn btn-primary">signup</button>
    </Link>
  );
}

export default SigninBtn;
