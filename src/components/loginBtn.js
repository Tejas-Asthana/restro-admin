import React from "react";
import { Link } from "react-router-dom";

function LoginBtn() {
  return (
    <Link to="/login">
      <button className="btn btn-primary"> Login</button>
    </Link>
  );
}

export default LoginBtn;
