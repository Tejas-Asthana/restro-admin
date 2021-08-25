import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import Navbar from "./components/navbar";
import Home from "./Pages/Home";
import PrivatePage from "./Pages/PrivatePage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

import Profile from "./Pages/profile";
import UpdateMenu from "./Pages/updateMenu";
import MyMenu from "./Pages/myMenu";
import Reviews from "./Pages/reviews";
import Payment from "./Pages/payment";

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
          <Route exact path="/payment" component={Payment} />

          <Route exact path="/privatePage" component={PrivatePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </PersistGate>
      </Router>
    </Provider>
  );
}

export default Routes;
