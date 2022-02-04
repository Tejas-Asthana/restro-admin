import React, { useEffect } from "react";
import { connect } from "react-redux";
import { io } from "socket.io-client";
import Base from "../../components/base/Base/Base";
import { loadUser } from "../../actions/authActions";

let Chats = (props) => {
  const socket = io("http://localhost:5000", {
    data: { res_id: props.user.id },
    transports: ["websocket", "polling", "flashsocket"],
  });

  // let [socketData, setSocketData] = useState({ res_id: null, c_id: null });

  const sendText = (new_msg) => {
    socket.emit("new_msg_r", {
      data: {
        new_msg,
        res_id: props.user.id,
        r_s_id: socket.id,
      },
    });
  };

  useEffect(() => {
    props.loadUser();

    socket.on("connect", (payload) => {
      console.log("payload: ", payload);
      console.log(socket.id, props.user.id);
      socket.emit("r-login", {
        data: { res_id: props.user?.id, r_s_id: socket.id },
      });

      sendText("Hello world");

      socket.emit("disconnect");
    });
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
