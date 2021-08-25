import React from "react";
import HomeBtn from "./HomeBtn";
import SignupBtn from "./SignupBtn";
import LoginBtn from "./loginBtn";
import LogoutBtn from "./logoutBtn";

import { connect } from "react-redux";

function Navbar(props) {
  return (
    <div className="container-fluid">
      <div className="row py-2 bg-dark">
        <div className="col-4">
          <HomeBtn />
        </div>
        <div
          className={
            props.isAuthenticated
              ? "d-none"
              : "text-right col-4 d-block ml-auto"
          }
        >
          <SignupBtn />
        </div>
        <div
          className={
            props.isAuthenticated ? "d-none" : "text-right col-4 d-block"
          }
        >
          <LoginBtn />
        </div>
        <div
          className={
            props.isAuthenticated
              ? "text-right col-8 d-block ml-auto"
              : "d-none"
          }
        >
          <LogoutBtn />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Navbar);
