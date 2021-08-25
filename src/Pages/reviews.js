import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Store from "../store/store";
import axios from "axios";

import Base from "../components/base/Base/Base";
import { loadUser } from "../actions/authActions";
import { generateTokenConfig } from "../actions/authActions";

let Profile = (props) => {
  let [reviews, setReviews] = useState({});
  let [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    props.loadUser();
    // console.log(Store.store.getState());
    !props.user
      ? props.history.push("/login")
      : axios
          .get(
            `http://localhost:5000/api/admin/getReviews/${props.user.id}`,
            generateTokenConfig(Store.store.getState)
          )
          .then((res) => {
            JSON.stringify(res.data.data);
            setReviews(res.data.data);
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
              <h1 className="ml-3">Reviews</h1>
            </div>
            <div className="card-body">
              {isUserLoaded ? (
                <ul type="none">
                  {/* {console.log(reviews.reviews)} */}
                  {reviews.reviews.map((reviews, indx) => {
                    return (
                      <li className="row border-bottom mb-3 pb-3" key={indx}>
                        <div className="col-12">
                          Date {"&"} Time: {reviews.date ? reviews.date : null},{" "}
                          {reviews.time ? reviews.time : null}
                        </div>
                        <div className="col-12">
                          Name: {reviews.name ? reviews.name : null}
                        </div>
                        <div className="col-12">
                          Email: {reviews.email ? reviews.email : null}
                        </div>
                        <div className="col-12">
                          Review: {reviews.message ? reviews.message : null}
                        </div>
                        <div className="col-12">
                          Phone number: {reviews.phone ? reviews.phone : null}
                        </div>
                      </li>
                    );
                  })}
                </ul>
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
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { loadUser })(Profile);
