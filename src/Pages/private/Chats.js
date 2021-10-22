import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { io } from "socket.io-client";
import Base from "../../components/base/Base/Base";
import { loadUser } from "../../actions/authActions";

let Chats = (props) => {
  const socket = io("http://localhost:5000", {
    query: { from: "restraunt", id: props.user.id },
    transports: ["websocket", "polling", "flashsocket"],
  });

  socket.on("connect", () => {
    console.log(socket.id); // WHduC6eoGEiiGoIWAAAB
  });

  useEffect(() => {
    props.loadUser();
  }, []);

  return props.isAuthenticated ? (
    <>
      <Base>
        <h1>My Chats</h1>
      </Base>
    </>
  ) : (
    <>{props.history.push("/login")}</>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { loadUser })(Chats);
