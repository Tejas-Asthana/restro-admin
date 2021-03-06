import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Base from "../../components/base/Base/Base";
import { loadUser } from "../../actions/authActions";

let BlankPvtPage = (props) => {
  useEffect(() => {
    props.loadUser();
  }, []);

  return props.isAuthenticated ? (
    <>
      <Base>
        <h1>Blank Private Page</h1>
      </Base>
    </>
  ) : (
    <>{props.history.push("/login")}</>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { loadUser })(BlankPvtPage);
