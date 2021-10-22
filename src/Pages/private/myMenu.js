import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Store from "../../store/store";
import axios from "axios";

import Base from "../../components/base/Base/Base";
import { loadUser } from "../../actions/authActions";
import { generateTokenConfig } from "../../actions/authActions";

let MyMenu = (props) => {
  let [menu, setMenu] = useState({});
  let [isMenuLoaded, setIsMenuLoaded] = useState(false);

  useEffect(() => {
    props.loadUser();
    // console.log(Store.store.getState());
    !props.user
      ? props.history.push("/login")
      : axios
          .get(
            `http://localhost:5000/api/admin/getMenu/${props.user.id}`,
            generateTokenConfig(Store.store.getState)
          )
          .then((res) => {
            // console.log(res.data.menu);
            setMenu(res.data.menu.categories);
            setIsMenuLoaded(true);
          })
          .catch((err) => {
            throw err;
          });
    // console.log(menu);
  }, []);

  return props.isAuthenticated ? (
    <>
      <Base>
        <div className="container-fluid">
          <div className="card shadow-sm">
            <div className="card-header">
              <h1 className="ml-3">MY MENU</h1>
            </div>
            <div className="card-body">
              {console.log(menu)}
              <ul type="none">
                {isMenuLoaded ? (
                  menu.map((value, indx) => {
                    return (
                      <li key={indx}>
                        <h3>{value.name}</h3>
                        <div className="row">
                          <div className="col-6 text-left">
                            {value.timeFrom}
                          </div>
                          <div className="col-6 text-right">{value.timeTo}</div>
                        </div>
                        <ul type="none">
                          <div className="container-fluid">
                            {value.subCategories.map((val, i) => {
                              return (
                                <li key={i}>
                                  <h3>{val.name}</h3>
                                  <ul type="none" className="row">
                                    {val.dishes.map((dish, dishIndx) => {
                                      return (
                                        <div key={dishIndx} className="col-6">
                                          <div>
                                            <b>{dish.title}</b>
                                          </div>
                                          <div>
                                            <i>{dish.desc}</i>
                                          </div>
                                          <div className="row">
                                            <div className="col-6">
                                              {dish.priceHalf}
                                            </div>
                                            <div className="col-6">
                                              {dish.priceFull}
                                            </div>
                                          </div>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck1"
                                              checked={dish.spicy}
                                            />
                                            <label
                                              className="custom-control-label"
                                              for="customCheck1"
                                            >
                                              spicy
                                            </label>
                                          </div>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck1"
                                              checked={dish.veg}
                                            />
                                            <label
                                              className="custom-control-label"
                                              for="customCheck1"
                                            >
                                              veg
                                            </label>
                                          </div>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck1"
                                              checked={dish.jainAvailable}
                                            />
                                            <label
                                              className="custom-control-label"
                                              for="customCheck1"
                                            >
                                              jainAvailable
                                            </label>
                                          </div>
                                          <br />
                                        </div>
                                      );
                                    })}
                                  </ul>
                                </li>
                              );
                            })}
                          </div>
                        </ul>
                      </li>
                    );
                  })
                ) : (
                  <div className="container text-center">
                    <div
                      className="spinner-border"
                      style={{ width: "3rem", height: "3rem" }}
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </Base>
    </>
  ) : (
    <>{props.history.push("/login")}</>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  error: state.error,
});

export default connect(mapStateToProps, { loadUser })(MyMenu);
