import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

import Base from "../components/base/Base/Base";
import Store from "../store/store";
import { loadUser, generateTokenConfig } from "../actions/authActions";

import AddCategory from "../components/updateMenu/AddCategory";
import AddSubCategory from "../components/updateMenu/AddSubCategory";
import AddDish from "../components/updateMenu/AddDish";

let Profile = (props) => {
  let [menu, setMenu] = useState({});
  let [isMenuLoaded, setIsMenuLoaded] = useState(false);

  useEffect(() => {
    props.loadUser();
    // console.log(Store.store.getState());
    !props.user
      ? props.history.push("/login")
      : axios
          .get(
            `http://localhost:5000/api/admin/getMenu/${props.user.email}`,
            generateTokenConfig(Store.store.getState)
          )
          .then((res) => {
            setMenu(res.data.menu[0]);
            setIsMenuLoaded(true);
          })
          .catch((err) => {
            throw err;
          });
  }, []);

  return !props.isAuthenticated ? (
    <>{props.history.push("/login")}</>
  ) : (
    <Fragment>
      <Base>
        <div className="container-fluid">
          <div className="card shadow-sm">
            <div className=" card-header">
              <h1 className="ml-3">UPDATE MENU</h1>
            </div>
            <div className="card-body">
              {<AddCategory menu={menu} isMenuLoaded={isMenuLoaded} />}
              {<AddSubCategory menu={menu} isMenuLoaded={isMenuLoaded} />}
              {<AddDish menu={menu} isMenuLoaded={isMenuLoaded} />}
            </div>
          </div>
        </div>
      </Base>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { loadUser })(Profile);
