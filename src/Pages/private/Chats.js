import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { socket } from "./socket.jsx";
import Base from "../../components/base/Base/Base";
import { loadUser } from "../../actions/authActions";

let Chats = (props) => {
  useEffect(() => {
    props.loadUser();
    rLogin();
  });
  let msgs = new Map();

  // allmsgs = {
  //   c_s_id: {
  //     personal: { __ },
  //     chat:[{ __ }, { __ }],
  //   }
  // };

  const rLogin = () => {
    socket.emit("r-login", {
      data: { res_id: props.user?.id, r_s_id: socket.id },
    });
  };

  socket.on("login-successful", (payload) => {
    console.log("LOGIN CONFIRMATION SUCCESSFUL !");
  });

  const sendText = (new_msg, c_s_id) => {
    socket.emit("new_msg_r", {
      data: {
        new_msg,
        from: "res",
        res_id: props.user.id,
        r_s_id: socket.id,
        c_s_id,
      },
    });
    if (msgs.has(c_s_id)) {
      let tmp = msgs.get(c_s_id);
      tmp.chat.push(new_msg);
      msgs.set(c_s_id, tmp);
    } else {
      let cust = {
        chat: [],
      };
      cust.chat.push(new_msg);
      msgs.set(c_s_id, cust);
    }
  };

  // sendText("Hello world", NULL);

  socket.on("new_login_c", (payload) => {
    console.log("New customer logged-in. c_s_id:", payload?.data?.c_s_id);
    // let msg = { txt: "Welcome customer !", from: "res", userAction: false };
    // sendText(msg, payload?.data?.c_s_id);
  });

  socket.on("new_msg_ctor", (payload) => {
    console.log("New msg received from customer: ", payload.data.c_s_id);
    console.log(payload.data.txt);
    if (msgs.get(payload.data.c_s_id).chat != undefined)
      msgs.get(payload.data.c_s_id).chat.push(payload.data.txt);
    else {
      msgs = { chat: [] };
      msgs.chat.push(payload.data.txt);
      msgs.set(payload.data.c_s_id, msgs);
    }
  });

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
