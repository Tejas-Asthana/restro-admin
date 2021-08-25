import React, { useState, useEffect } from "react";
import { store } from "../store/store";
import { returnErrors } from "../actions/errorActions";
import { HelloWorld } from "../actions/consoleActions";
import { loadUser } from "../actions/authActions";

import { connect } from "react-redux";

let PrivatePage = (props) => {
  useEffect(() => {
    props.loadUser();
    // store.dispatch(props.returnErrors(props.error.msg, props.error.status));
    // console.log(props.error.msg, props.error.status);
    // props.returnErrors(props.error.msg, props.error.status);
  }, []);

  let [displayData, setData] = useState({
    // data: store.getState().consoleData.data,
  });

  function onClickHandler() {
    props.HelloWorld("Hello World!");
    console.log(store.getState());
  }

  // will be called whenever the app state changes.
  store.subscribe(() => {
    // console.log("App state modified", store.getState());
    setData({ data: store.getState()?.consoleData?.data });
  });

  // component will be unsubscribed from store
  // unsubscribe();

  return props.isAuthenticated ? (
    <>
      <div className="jumbotron text-dark font-weight-light text-center">
        This is a private page
        <br />
        <button className="btn btn-primary" onClick={() => onClickHandler()}>
          Redux data
        </button>
      </div>
      <br />
      <br />
      <br />
      <div>{displayData.data}</div>
    </>
  ) : (
    <>{props.history.push("/login")}</>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { loadUser, HelloWorld, returnErrors })(
  PrivatePage
);
