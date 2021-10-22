import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import Navbar from "./components/navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

import Profile from "./Pages/private/profile";
import UpdateMenu from "./Pages/private/updateMenu";
import MyMenu from "./Pages/private/myMenu";
import Reviews from "./Pages/private/reviews";
import Chats from "./Pages/private/Chats";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";

function Routes() {
  return (
    <Provider store={store}>
      <Router basename="/admin">
        <PersistGate persistor={persistor}>
          {/* <Navbar /> */}
          <Route exact path="/" component={Home} />

          <Route exact path="/profile" component={Profile} />
          <Route exact path="/menu/updateMenu" component={UpdateMenu} />
          <Route exact path="/menu/myMenu" component={MyMenu} />
          <Route exact path="/reviews" component={Reviews} />
          <Route exact path="/chats" component={Chats} />

          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </PersistGate>
      </Router>
    </Provider>
  );
}

export default Routes;
