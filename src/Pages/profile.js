import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Store from "../store/store";
import axios from "axios";

import Base from "../components/base/Base/Base";
import { loadUser } from "../actions/authActions";
import { generateTokenConfig } from "../actions/authActions";

let Profile = (props) => {
  let [userInfo, setUserInfo] = useState({});
  let [isUserLoaded, setIsUserLoaded] = useState(false);

  let [isEditOn, setIsEditOn] = useState(false);
  function toggleEditMode() {
    setIsEditOn((prev) => !prev);
  }

  useEffect(() => {
    props.loadUser();
    // console.log(Store.store.getState());
    !props.user
      ? props.history.push("/login")
      : axios
          .get(
            `http://localhost:5000/api/admin/getUserInfo/${props.user.id}`,
            generateTokenConfig(Store.store.getState)
          )
          .then((res) => {
            JSON.stringify(res.data.userPersonalInfo);
            setUserInfo(res.data.userPersonalInfo);
            setIsUserLoaded(true);
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
              <h1 className="ml-3">Profile</h1>
            </div>
            <div className="card-body">
              {isUserLoaded ? (
                <>
                  <div className="row justify-content-end mb-4">
                    <div className="col-12">
                      <button
                        className="btn btn-outline-info float-right"
                        role="button"
                        onClick={toggleEditMode}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                  {isEditOn ? (
                    <ul type="none">
                      <li className="row justify-content-around align-items-center">
                        <div className="col-5">
                          <i>
                            <b>USERNAME: </b>
                          </i>
                        </div>
                        <div className="col-7">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              value={
                                userInfo.username ? userInfo.username : null
                              }
                            />
                          </div>
                        </div>
                      </li>
                      <br />
                      <li className="row justify-content-around align-items-center">
                        <div className="col-5">
                          <i>
                            <b>EMAIL: </b>
                          </i>
                        </div>
                        <div className="col-7">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              value={userInfo.email ? userInfo.email : null}
                            />
                          </div>
                        </div>
                      </li>
                      <br />
                      <li className="row justify-content-around">
                        <div className="col-5">
                          <i>
                            <b>PHONE: </b>
                          </i>
                        </div>
                        <div className="col-7">
                          <div type="none" className="row">
                            {userInfo.phone
                              ? userInfo.phone.map((phone, indx) => {
                                  return (
                                    <div className="col-12" key={indx}>
                                      <div className="form-group">
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={phone ? phone : null}
                                        />
                                      </div>
                                    </div>
                                  );
                                })
                              : null}
                          </div>
                        </div>
                      </li>
                      <br />
                      <li>
                        <i>
                          <b>social:</b>
                        </i>
                        <ul type="none">
                          <li className="row justify-content-around">
                            <div className="col-5">
                              <i>FB:</i>
                            </div>
                            <div className="col-7">
                              <i>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      userInfo.social
                                        ? userInfo.social.fb
                                        : null
                                    }
                                  />
                                </div>
                              </i>
                            </div>
                          </li>
                          <li className="row justify-content-around">
                            <div className="col-5">
                              <i>INSTA: </i>
                            </div>
                            <div className="col-7">
                              <i>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      userInfo.social
                                        ? userInfo.social.insta
                                        : null
                                    }
                                  />
                                </div>
                              </i>
                            </div>
                          </li>
                          <li className="row justify-content-around">
                            <div className="col-5">
                              <i>TWITTER: </i>
                            </div>
                            <div className="col-7">
                              <i>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      userInfo.social
                                        ? userInfo.social.twitter
                                        : null
                                    }
                                  />
                                </div>
                              </i>
                            </div>
                          </li>
                        </ul>
                      </li>
                      <br />
                      <li className="row justify-content-around align-items-center">
                        <div className="col-5">
                          <i>
                            <b>UPI: </b>
                          </i>
                        </div>
                        <div className="col-7">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              value={userInfo.upi ? userInfo.upi : null}
                            />
                          </div>
                        </div>
                      </li>
                    </ul>
                  ) : (
                    <ul type="none">
                      <li className="row justify-content-around align-items-center">
                        <div className="col-5">
                          <i>
                            <b>USERNAME: </b>
                          </i>
                        </div>
                        <div className="col-7">
                          {userInfo.username ? userInfo.username : null}
                        </div>
                      </li>
                      <br />
                      <li className="row justify-content-around align-items-center">
                        <div className="col-5">
                          <i>
                            <b>EMAIL: </b>
                          </i>
                        </div>
                        <div className="col-7">
                          {userInfo.email ? userInfo.email : null}
                        </div>
                      </li>
                      <br />
                      <li className="row justify-content-around">
                        <div className="col-5">
                          <i>
                            <b>PHONE: </b>
                          </i>
                        </div>
                        <div className="col-7">
                          <div type="none" className="row">
                            {userInfo.phone
                              ? userInfo.phone.map((phone, indx) => {
                                  return (
                                    <div className="col-12" key={indx}>
                                      {phone}
                                    </div>
                                  );
                                })
                              : null}
                          </div>
                        </div>
                      </li>
                      <br />
                      <li>
                        <i>
                          <b>social:</b>
                        </i>
                        <ul type="none">
                          <li className="row justify-content-around">
                            <div className="col-5">
                              <i>FB:</i>
                            </div>
                            <div className="col-7">
                              <i>
                                {userInfo.social ? userInfo.social.fb : null}{" "}
                              </i>
                            </div>
                          </li>
                          <li className="row justify-content-around">
                            <div className="col-5">
                              <i>INSTA: </i>
                            </div>
                            <div className="col-7">
                              <i>
                                {userInfo.social ? userInfo.social.insta : null}
                              </i>
                            </div>
                          </li>
                          <li className="row justify-content-around">
                            <div className="col-5">
                              <i>TWITTER: </i>
                            </div>
                            <div className="col-7">
                              <i>
                                {userInfo.social
                                  ? userInfo.social.twitter
                                  : null}
                              </i>
                            </div>
                          </li>
                        </ul>
                      </li>
                      <br />
                      <li className="row justify-content-around align-items-center">
                        <div className="col-5">
                          <i>
                            <b>UPI: </b>
                          </i>
                        </div>
                        <div className="col-7">
                          {userInfo.upi ? userInfo.upi : null}
                        </div>
                      </li>
                    </ul>
                  )}
                </>
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
  user: state.auth.user,
  id: state.auth.id,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { loadUser })(Profile);
